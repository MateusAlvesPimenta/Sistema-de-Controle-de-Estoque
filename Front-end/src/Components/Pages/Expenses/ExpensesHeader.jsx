import { AddExpenseButton } from "../../ActionButtons/ExpensesButtons/Index"

export const ExpensesHeader = () => {

    return (
        <header className="py-3">
            <h1>Expenses</h1>
            <br />
            <AddExpenseButton />
        </header>
    )
}