import { useContext, useMemo, useState } from "react"
import { Table } from "reactstrap"
import { Context } from "../../Context/Index"
import { format } from "date-fns";

export const LatestSalesTable = () => {

    const { sales } = useContext(Context);
    const [sortedSales, setSortedSales] = useState([]);

    useMemo(() => {
        // const temp
        setSortedSales([...sales].sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate)));
    }, [sales]);
    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Total</th>
                    <th>Sale date</th>
                </tr>
            </thead>
            <tbody>
                {
                    sortedSales.slice(0, 5).map(sale => (
                        <tr key={sale.saleId}>
                            <td>{sortedSales.findIndex(s => s === sale) + 1}</td>
                            <td>{sale.customerName}</td>
                            <td>{sale.total}</td>
                            <td>{format(sale.saleDate, "dd/MM/yy - hh:mm")}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}