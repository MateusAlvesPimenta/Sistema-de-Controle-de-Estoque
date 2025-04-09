import { api } from "./api"

export const getAllExpenses = async (config) => {
    return await api.get("/GetAllExpenses", config)
        .catch(e => console.log(e));
}

export const getExpensesByDate = async (date1, date2, config) => {
    return await api.get(`/GetExpensesByDate?initialDate=${date1}&lastDate=${date2}`, config)
        .catch(e => {
            console.log(e);
            if (e.status === 404) {
                return { status: 404 };
            }
        })
}

export const addExpense = async (entity, config) => {
    await api.post("/AddExpense", entity, config)
        .catch(e => console.log(e));
}

export const updateExpense = async (entity, config) => {
    await api.put("/UpdateExpense/" + entity.expenseId, entity, config)
        .catch(e => console.log(e));
}

export const deleteExpense = async (id, config) => {
    await api.delete("/DeleteExpense/" + id, config)
        .catch(e => console.log(e));
}