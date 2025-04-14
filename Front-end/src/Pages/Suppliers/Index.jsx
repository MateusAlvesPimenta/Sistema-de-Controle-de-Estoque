import { Container } from "reactstrap"
import { SuppliersHeader } from "./SuppliersHeader"
import { ListSuppliers } from "./ListSuppliers"

export const Suppliers = () => {

    return (
        <Container>
            <SuppliersHeader />
            <ListSuppliers />
        </Container>
    )
}