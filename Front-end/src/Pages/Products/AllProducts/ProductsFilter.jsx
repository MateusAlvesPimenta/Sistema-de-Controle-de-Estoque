import { useContext, useState } from "react"
import {
    Badge, Button, ButtonGroup, DropdownItem, DropdownMenu,
    DropdownToggle, Form, FormGroup, Input,
    UncontrolledButtonDropdown
} from "reactstrap"
import { Context } from "../../../Context/Index";

export const ProductsFilter = () => {

    const { suppliers, getByNameOrSupplier } = useContext(Context);
    const [name, setName] = useState("");
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);

    const handleChange = (e) => {
        const { value } = e.target;
        setName(value);
    }

    const selectSupplier = (supplier) => {
        if (!selectedSuppliers.includes(supplier)) {
            setSelectedSuppliers([...selectedSuppliers, supplier]);
        }
    }

    const removeSupplier = (supplier) => {
        setSelectedSuppliers(selectedSuppliers.filter(item => item != supplier));
    }

    const submit = () => {
        let ids = selectedSuppliers.map(supplier => supplier.supplierId).join(",");

        let data = {
            name: name,
            supplierIds: ids
        };
        getByNameOrSupplier(data);
        event.preventDefault();
    }

    return (
        <>
            <h3>Filters</h3>
            <Form className="mb-3"
                onSubmit={submit}>
                <FormGroup className="d-flex flex-fill">
                    <Input
                        type="text"
                        id="nameFilter"
                        name="nameFilter"
                        placeholder="Filter by name"
                        maxLength="100"
                        onChange={handleChange} />
                    <ButtonGroup className="ms-3">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle caret >Suppliers </DropdownToggle>
                            <DropdownMenu>
                                {
                                    suppliers && suppliers.map(supplier => (
                                        <DropdownItem
                                            onClick={() => selectSupplier(supplier)}
                                            key={supplier.supplierId}>
                                            {supplier.name}
                                        </DropdownItem>
                                    ))
                                }
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        <Button className="px-3" color="success" type="submit">
                            <i className="bi bi-filter"> </i>
                            Apply
                        </Button>
                    </ButtonGroup>
                </FormGroup>
                {
                    selectedSuppliers.map(supplier => (
                        <Badge
                            color="primary"
                            key={supplier.supplierId}>
                            {supplier.name}
                            <button
                                type="button"
                                className="btn-x"
                                onClick={() => removeSupplier(supplier)}>
                                <i className="bi bi-trash-fill"></i>
                            </button>
                        </Badge>
                    ))
                }
            </Form>
        </>
    )
}