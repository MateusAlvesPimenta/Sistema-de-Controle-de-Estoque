import { Container } from "reactstrap"
import { ListSales } from "./ListSales"
import { SalesHeader } from "./SalesHeader"
import { DateFilter } from "../DateFilter"

export const Sales = () => {

    return (
        <Container>
            <div className="d-flex  justify-content-between">
                <SalesHeader />
                <DateFilter entityType="sale"/>
            </div>
            <ListSales />
        </Container>
    )
}