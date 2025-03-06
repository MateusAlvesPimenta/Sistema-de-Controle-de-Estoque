import { useContext, useMemo, useState } from "react"
import { Context } from "../../Context/Index"
import { Link } from "react-router-dom";

export const DashboardContent = () => {

    const { sales, totalSales, totalExpenses } = useContext(Context);
    const [profit, setProfit] = useState(totalSales - totalExpenses);
    const [salesCount, setSalesCount] = useState(sales.length);

    useMemo(() => {
        setProfit(totalSales - totalExpenses);
        setSalesCount(sales.length);
    }, [totalExpenses, totalExpenses])

    return (
        <>
            <div className="grid-container">
                <div className={`grid-item ${profit > 0 ? "sales" : "expenses"}`}>
                    <h5>Profit</h5>
                    <h1>R${profit.toLocaleString()}</h1>
                </div>
                <Link
                    to="/expenses"
                    className="grid-item expenses">
                    <h5>Total expenses</h5>
                    <h1>R${totalExpenses.toLocaleString()}</h1>
                </Link>
                <Link
                    to="/sales"
                    className="grid-item sales">
                    <h5>Total sales</h5>
                    <h1>R${totalSales.toLocaleString()}</h1>
                </Link>
                <div className={`grid-item ${salesCount > 0 ? "sales" : "expenses"}`}>
                    <h5>Sales count</h5>
                    <h1>{salesCount}</h1>
                </div>
            </div>
        </>
    )
}