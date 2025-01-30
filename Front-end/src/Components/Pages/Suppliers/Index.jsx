import { Container } from "reactstrap"

import { Header } from "./Header/Index"
import { ListSuppliers } from "./ListSuppliers"

export const Suppliers = () => {
    
    return (
        <Container >
            <Header />
            <ListSuppliers />
        </Container>
    )
}