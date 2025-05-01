import { Container } from "reactstrap"
import { SalesHeader } from "./SalesHeader"
import { DateFilter } from "../DateFilter"
import { SalesTable } from "./SalesTable"

export const Sales = () => {

    return (
        <Container>
            <div className="d-flex  justify-content-between">
                <SalesHeader />
                <DateFilter entityType="sale"/>
            </div>
            <SalesTable />
        </Container>
    )
}