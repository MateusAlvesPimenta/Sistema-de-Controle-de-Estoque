import { Container } from "reactstrap"
import { ExpensesHeader } from "./ExpensesHeader"
import { ListExpenses } from "./ListExpenses"

export const Expenses = () => {

    return (
        <Container>
            <ExpensesHeader />
            <ListExpenses />
        </Container>
    )
}