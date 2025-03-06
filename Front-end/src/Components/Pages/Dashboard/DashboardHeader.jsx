import { useContext, useEffect, useMemo, useState } from "react"
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap"
import { Context } from "../../Context/Index";
import { format } from "date-fns";

export const DashboardHeader = () => {

    const { getByDate, getAll } = useContext(Context);
    const [period, setPeriod] = useState("30 Days");

    const toggleDate = (days) => {

        if (typeof days === "number") {
            setPeriod(`Last ${days} days`);
        }
        else if (days === "all time") {
            setPeriod("All time");
            getAll("sale");
            getAll("expense");
            return;
        }

        let initialDate = new Date();
        let lastDate = format(initialDate, "yyyy/MM/dd 23:59:59");

        initialDate.setDate(initialDate.getDate() - days);
        initialDate = format(initialDate, "yyyy-MM-dd");

        getByDate(initialDate, lastDate, "sale");
        getByDate(initialDate, lastDate, "expense");
    }

    useEffect(() => {
        toggleDate(30);
    }, []);

    return (
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
    )
}