import { useContext } from "react"
import { Table } from "reactstrap"
import { format } from "date-fns";
import { Context } from "../../../Context/Index"
import { EditExpenseButton } from "../../../Components/ActionButtons/ExpensesButtons/Index";
import { DeleteEntity } from "../../../Components/ActionButtons/GeneralButtons";

export const ListExpenses = () => {

    const { expenses, totalExpenses } = useContext(Context);

    return (
        <>
            <h3>Total expenses: R${totalExpenses.toLocaleString()}</h3>
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Expense date</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses && expenses.map(expense => (
                            <tr key={expense.expenseId}>
                                <td>{expense.expenseId}</td>
                                <td>{expense.name}</td>
                                <td>R${expense.price.toLocaleString()}</td>
                                <td>{format(expense.expenseDate, "dd/MM/yyyy hh:mm")}</td>
                                <td className="col-1">
                                    <EditExpenseButton entity={expense} />
                                </td>
                                <td className="col-1">
                                    <DeleteEntity entityType="expense" entityId={expense.expenseId} entityName={expense.name} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}