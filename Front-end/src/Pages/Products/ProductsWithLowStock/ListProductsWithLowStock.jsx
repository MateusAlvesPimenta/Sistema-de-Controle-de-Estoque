import { useContext } from "react";
import { Table } from "reactstrap"
import { Context } from "../../../Context/Index";
import { RestockProductsButton } from "../../../Components/ActionButtons/ProductsButtons/Index";

export const ListProductsWithLowStock = () => {

    const { productsWithLowStock } = useContext(Context);

    return (
        <Table hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th className="col-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {productsWithLowStock.map(product => (
                    <tr key={product.productId}>
                        <td>{product.productId}</td>
                        <td>{product.name}</td>
                        <td>R${product.price.toLocaleString()}</td>
                        <td>{product.quantity}</td>
                        <td><RestockProductsButton id={product.productId} name={product.name} /></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}