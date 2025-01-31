import React, { useContext } from "react";
import { Table } from "reactstrap";

import { Context } from "../../Context/Index";
import { EditSupplier } from "../../ActionButtons/SuppliersButtons/Index";
import { DeleteEntity } from "../../ActionButtons/GeneralButtons";

export const ListSuppliers = () => {

    const { suppliers } = useContext(Context);

    if (suppliers.length == 0) {
        return (
            <h1>There is no supplier</h1>
        )
    }
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>PhoneNumber</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {suppliers.map(supplier => (
                    <tr key={supplier.supplierId}>
                        <td>{supplier.supplierId}</td>
                        <td>{supplier.name}</td>
                        <td>{supplier.phoneNumber}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.address}</td>
                        <td>
                            <EditSupplier entity={supplier} />
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