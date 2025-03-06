import { useContext } from "react"
import { Table } from "reactstrap";
import { format } from "date-fns";
import { Context } from "../../Context/Index"

export const ListSales = () => {

    const { sales, totalSales } = useContext(Context);

    return (
        <>
            <h3>Total sales: R${totalSales.toFixed(2)}</h3>
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer name</th>
                        <th>Total price</th>
                        <th>Sale date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sales && sales.map(sale => (
                            <tr key={sale.saleId}>
                                <td>{sale.saleId}</td>
                                <td>{sale.customerName}</td>
                                <td>R${sale.total}</td>
                                <td>{format(sale.saleDate, "dd/MM/yyyy - hh:mm")}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}