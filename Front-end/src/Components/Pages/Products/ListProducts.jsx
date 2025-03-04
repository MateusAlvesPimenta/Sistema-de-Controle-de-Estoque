import { useContext } from "react"
import { Table } from "reactstrap"
import { Context } from "../../Context/Index"
import { DeleteEntity } from "../../ActionButtons/GeneralButtons";
import { EditProductButton } from "../../ActionButtons/ProductsButtons/Index";

export const ListProducts = () => {

    const { products } = useContext(Context);

    return (
        <Table hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quatity</th>
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
                            <td>R${product.price}</td>
                            <td>{product.quantity}</td>
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