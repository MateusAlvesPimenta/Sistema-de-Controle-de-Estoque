import { useContext, useMemo, useState } from "react"
import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from "reactstrap";
import { format } from "date-fns";
import { Context } from "../../Context/Index"
import { TopSellingProductsTable } from "../../Components/Tables/TopSellingProductsTable";
import { LatestSalesTable } from "../../Components/Tables/LatestSalesTable";

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
        if (sessionStorage.getItem("token")) {
            toggleDate("all time");
        }
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
            <div className="flex-container">
                <div className={`flex-item ${profit > 0 ? "positive" : "negative"}`}>
                    <h5>Profit</h5>
                    <p>R${profit.toLocaleString()}</p>
                </div>
                <Link
                    to="/expenses"
                    className="flex-item negative m-auto">
                    <h5>Total expenses</h5>
                    <p>R${totalExpenses.toLocaleString()}</p>
                </Link>
                <Link
                    to="/sales"
                    className="flex-item positive">
                    <h5>Total sales</h5>
                    <p>R${totalSales.toLocaleString()}</p>
                </Link>
                <div className={`flex-item ${salesCount > 0 ? "positive" : "negative"}`}>
                    <h5>Sales count</h5>
                    <p >{salesCount}</p>
                </div>
            </div>
            <div className="flex-container my-5">
                <Card className="">
                    <CardHeader className="d-flex justify-content-between">
                        <h4>Top selling products</h4>
                        <Link
                            to="/products/top-selling"
                            className="ms-3">
                            <i className="bi bi-box-arrow-up-right"></i>
                        </Link>
                    </CardHeader>
                    <CardBody>
                        <TopSellingProductsTable fullInfo={false} />
                    </CardBody>
                </Card>
                <Card className="">
                    <CardHeader className="d-flex justify-content-between">
                        <h4>Latest sales</h4>
                        <Link
                            to="/sales"
                            className="ms-3">
                            <i className="bi bi-box-arrow-up-right"></i>
                        </Link>
                    </CardHeader>
                    <CardBody>
                        <LatestSalesTable />
                    </CardBody>
                </Card>
            </div>
        </>
    )
}