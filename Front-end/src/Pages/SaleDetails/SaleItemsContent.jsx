import { useContext } from "react";
import { Table } from "reactstrap";
import { Context } from "../../Context/Index";

export const SaleItemsContent = () => {

    const { saleDetails } = useContext(Context);

    return (
        <div>
            <h2 className="py-3">Sale items</h2>
            <Table hover>
                <thead>
                    <tr>
                        <th>Product id</th>
                        <th>Name</th>
                        <th>Quantity sold</th>
                        <th>Unit price</th>
                        <th>Total price</th>
                    </tr>
                </thead>
                <tbody>
                    {saleDetails && saleDetails.saleItems.map(item => (
                        <tr>
                            <td>{item.productId}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>R${item.price.toLocaleString()}</td>
                            <td>R${(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}