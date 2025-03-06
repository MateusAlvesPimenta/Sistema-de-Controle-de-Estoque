import { Container } from "reactstrap"
import { ExpensesHeader } from "./ExpensesHeader"
import { ListExpenses } from "./ListExpenses"
import { DateFilter } from "../DateFilter"

export const Expenses = () => {

    return (
        <Container>
            <div className="d-flex justify-content-between">
                <ExpensesHeader />
                <DateFilter entityType="expense" />
            </div>
            <ListExpenses />
        </Container>
    )
}