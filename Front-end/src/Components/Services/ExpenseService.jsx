import { api } from "./api"

export const getAllExpenses = async () => {
    let expenses = await api.get("/GetAllExpenses")
        .catch(e => console.log(e));

    return expenses;
}

export const addExpense = async (entity) => {
    await api.post("/AddExpense", entity)
        .catch(e => console.log(e));
}

export const updateExpense = async (entity) => {
    await api.put("/UpdateExpense/" + entity.expenseId, entity)
        .catch(e => console.log(e));
}

export const deleteExpense = async (id) => {
    await api.delete("/DeleteExpense/" + id)
        .catch(e => console.log(e));
}