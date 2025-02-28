import { Container } from "reactstrap"
import { ListSales } from "./ListSales"
import { SalesHeader } from "./SalesHeader"

export const Sales = () => {

    return (
        <Container className="margin-left">
            <SalesHeader />
            <ListSales />
        </Container>
    )
}