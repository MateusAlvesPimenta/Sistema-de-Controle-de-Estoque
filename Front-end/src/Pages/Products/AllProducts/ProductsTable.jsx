import { useContext } from "react"
import { Table } from "reactstrap"
import { Context } from "../../../Context/Index";
import { EditProductButton } from "../../../Components/ActionButtons/ProductsButtons/Index";
import { DeleteEntity } from "../../../Components/ActionButtons/GeneralButtons";

export const ProductsTable = () => {

    const { products } = useContext(Context);

    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Supplier id</th>
                    <th>Actions</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    products && products.map(product => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.name}</td>
                            <td>R${product.price.toLocaleString()}</td>
                            <td>{product.quantity}</td>
                            <td>{product.supplierId}</td>
                            <td className="col-1">
                                <EditProductButton entity={product} />
                            </td>
                            <td className="col-1">
                                <DeleteEntity entityId={product.productId} entityName={product.name} entityType={"product"} />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}