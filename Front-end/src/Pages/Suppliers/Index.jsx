import { Container } from "reactstrap"
import { SuppliersHeader } from "./SuppliersHeader"
import { SuppliersTable } from "./SuppliersTable"

export const Suppliers = () => {

    return (
        <Container>
            <SuppliersHeader />
            <SuppliersTable />
        </Container>
    )
}