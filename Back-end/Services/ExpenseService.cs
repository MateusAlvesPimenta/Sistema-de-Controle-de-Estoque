using Back_end.Context;
using Back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly MyAppContext _context;

        public ExpenseService(MyAppContext context)
        {
            _context = context;
        }

        public async Task<List<Expense>> GetAllExpenses()
        {
            var expenses = await _context.Expenses.ToListAsync();
            return expenses;
        }

        public async Task<Expense> GetExpenseById(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            return expense;
        }

        public async Task<List<Expense>> GetExpensesByDate(DateTime initialDate, DateTime LastDate)
        {
            var expenses = await _context.Expenses.Where(expense => expense.ExpenseDate >= initialDate &&
                                                                    expense.ExpenseDate <= LastDate)
                                                    .ToListAsync();
            return expenses;
        }

        public async Task AddExpense(Expense expense)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateExpense(Expense expense)
        {
            _context.Expenses.Entry(expense).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteExpense(Expense expense)
        {
            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
        }
    }
}