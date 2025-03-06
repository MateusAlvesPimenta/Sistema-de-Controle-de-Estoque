using Back_end.Models;

namespace Back_end.Services
{
    public interface IExpenseService
    {
        Task<List<Expense>> GetAllExpenses();
        Task<Expense> GetExpenseById(int id);
        Task AddExpense(Expense expense);
        Task UpdateExpense(Expense expense);
        // For development purposes
        Task DeleteExpense(Expense expense);
    }
}