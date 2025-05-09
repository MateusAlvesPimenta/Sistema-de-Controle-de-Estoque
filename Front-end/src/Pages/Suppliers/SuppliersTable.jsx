import { useContext } from "react";
import { Table } from "reactstrap";

import { Context } from "../../Context/Index";
import { EditSupplierButton } from "../../Components/ActionButtons/SuppliersButtons/Index";
import { DeleteEntity } from "../../Components/ActionButtons/GeneralButtons";

export const SuppliersTable = () => {

    const { suppliers } = useContext(Context);

    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    suppliers && suppliers.map(supplier => (
                        <tr key={supplier.supplierId}>
                            <td>{supplier.supplierId}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.phoneNumber}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.address}</td>
                            <td>
                                <EditSupplierButton entity={supplier} />
                            </td>
                            <td>
                                <DeleteEntity
                                    entityId={supplier.supplierId}
                                    entityName={supplier.name}
                                    entityType="supplier" />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    )
}