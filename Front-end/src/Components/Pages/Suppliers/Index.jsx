import { Container } from "reactstrap"
import { SupplierHeader } from "./SupplierHeader"
import { ListSuppliers } from "./ListSuppliers"

export const Suppliers = () => {

    return (
        <Container>
            <SupplierHeader />
            <ListSuppliers />
        </Container>
    )
}