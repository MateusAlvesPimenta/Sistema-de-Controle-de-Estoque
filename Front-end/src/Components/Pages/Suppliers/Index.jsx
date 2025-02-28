import { Container } from "reactstrap"
import { SuppliersHeader } from "./SuppliersHeader"
import { ListSuppliers } from "./ListSuppliers"

export const Suppliers = () => {

    return (
        <Container className="margin-left">
            <SuppliersHeader />
            <ListSuppliers />
        </Container>
    )
}