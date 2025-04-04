import { useContext, useMemo, useState } from "react"
import { Context } from "../../Context/Index"
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { format } from "date-fns";
import { ListTopSellingProducts } from "../TopSellingProducts/ListTopSellingProducts";

export const DashboardContent = () => {

    const { sales, totalSales, totalExpenses, getByDate, getAll } = useContext(Context);
    const [profit, setProfit] = useState(totalSales - totalExpenses);
    const [salesCount, setSalesCount] = useState(sales.length);
    const [period, setPeriod] = useState("All time");
    const [updateData, setUpdateData] = useState(true);

    const toggleDate = (days) => {

        if (typeof days === "string") {
            setPeriod("All time");
            getAll("sale");
            getAll("expense");
            setInterval(() => setUpdateData(true), 100);
            return;
        }
        setPeriod(`Last ${days} days`);

        let initialDate = new Date();
        let lastDate = format(initialDate, "yyyy/MM/dd 23:59:59");

        initialDate.setDate(initialDate.getDate() - days);
        initialDate = format(initialDate, "yyyy-MM-dd");

        getByDate(initialDate, lastDate, "sale");
        getByDate(initialDate, lastDate, "expense");

        setInterval(() => setUpdateData(true), 100);
    }

    useMemo(() => {
        setProfit(totalSales - totalExpenses);
        setSalesCount(sales.length);
        setUpdateData(false);
    }, [updateData]);

    useMemo(() => {
        toggleDate("all time");
    }, [])

    return (
        <>
            <header className="py-4 d-flex justify-content-between">
                <h1>Dashboard</h1>

                <UncontrolledDropdown className="my-auto">
                    <DropdownToggle color="light">
                        <i className="bi bi-calendar3"> </i>
                        {period}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={() => toggleDate(30)}>
                            30 Days
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => toggleDate(60)}>
                            60 Days
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => toggleDate(90)}>
                            90 Days
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => toggleDate("all time")}>
                            All time
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </header>
            <div className="grid-container">
                <div className={`grid-item ${profit > 0 ? "positive" : "negative"}`}>
                    <h5>Profit</h5>
                    <h1>R${profit.toLocaleString()}</h1>
                </div>
                <Link
                    to="/expenses"
                    className="grid-item negative">
                    <h5>Total expenses</h5>
                    <h1>R${totalExpenses.toLocaleString()}</h1>
                </Link>
                <Link
                    to="/sales"
                    className="grid-item positive">
                    <h5>Total sales</h5>
                    <h1>R${totalSales.toLocaleString()}</h1>
                </Link>
                <div className={`grid-item ${salesCount > 0 ? "positive" : "negative"}`}>
                    <h5>Sales count</h5>
                    <h1>{salesCount}</h1>
                </div>
            </div>
            <Card className="my-5">
                <CardHeader className="d-flex my-auto">
                    <h4>Top selling products</h4>
                    <Link
                        to="/products/top-selling"
                        className="ms-auto">
                        <i className="bi bi-box-arrow-up-right"></i>
                    </Link>
                </CardHeader>
                <CardBody>
                    <ListTopSellingProducts info="minimum" />
                </CardBody>
            </Card>
        </>
    )
}