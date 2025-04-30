import { useContext } from "react"
import { Context } from "../../../Context/Index"
import { format } from "date-fns";
import { Table } from "reactstrap";

export const SaleContent = () => {

    const { saleDetails } = useContext(Context);

    return (
        <header className="sale-details">
            <h1 className="py-3">Sale details</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Sale id</th>
                        <th>Customer name</th>
                        <th>Total price</th>
                        <th>Sale date</th>
                    </tr>
                </thead>
                <tbody>
                    {saleDetails && (
                        <tr>
                            <td>{saleDetails.saleId}</td>
                            <td>{saleDetails.customerName}</td>
                            <td>R${saleDetails.total.toLocaleString()}</td>
                            <td>{format(saleDetails.saleDate, "dd/MM/yyyy - hh:mm")}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </header>
    )
}