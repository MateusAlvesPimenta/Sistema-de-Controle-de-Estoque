using Back_end.Models;

namespace Back_end.Services
{
    public interface IExpenseService
    {
        Task<List<Expense>> GetAllExpenses();
        Task<Expense> GetExpenseById(int id);
        Task<List<Expense>> GetExpensesByDate(DateTime initialDate, DateTime LastDate);
        Task AddExpense(Expense expense);
        Task UpdateExpense(Expense expense);
        Task DeleteExpense(Expense expense);
    }
}