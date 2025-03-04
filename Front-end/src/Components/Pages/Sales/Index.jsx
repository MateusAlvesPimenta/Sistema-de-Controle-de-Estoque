import { Container } from "reactstrap"
import { ListSales } from "./ListSales"
import { SalesHeader } from "./SalesHeader"
import { SalesFilter } from "./SalesFilter"

export const Sales = () => {

    return (
        <Container className="mt-3">
            <div className="d-flex  justify-content-between">
                <SalesHeader />
                <SalesFilter />
            </div>
            <ListSales />
        </Container>
    )
}