import { Container } from "reactstrap"
import { ExpensesHeader } from "./ExpensesHeader"
import { DateFilter } from "../DateFilter"
import { ExpensesTable } from "./ExpensesTable"

export const Expenses = () => {

    return (
        <Container>
            <div className="d-flex justify-content-between">
                <ExpensesHeader />
                <DateFilter entityType="expense" />
            </div>
            <ExpensesTable />
        </Container>
    )
}