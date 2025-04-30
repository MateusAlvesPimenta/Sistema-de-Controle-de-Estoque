import { useContext } from "react"
import { Table } from "reactstrap";
import { format } from "date-fns";
import { Context } from "../../../Context/Index"
import { Link } from "react-router-dom";

export const ListSales = () => {

    const { sales, totalSales } = useContext(Context);

    return (
        <>
            <h3>Total sales: R${totalSales.toLocaleString()}</h3>
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer name</th>
                        <th>Total price</th>
                        <th>Sale date</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sales && sales.map(sale => (
                            <tr key={sale.saleId}>
                                <td>{sale.saleId}</td>
                                <td>{sale.customerName}</td>
                                <td>R${sale.total.toLocaleString()}</td>
                                <td>{format(sale.saleDate, "dd/MM/yyyy - hh:mm")}</td>
                                <td>
                                    <Link to={`/sale/details/${sale.saleId}`}
                                        className="btn btn-primary">
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}