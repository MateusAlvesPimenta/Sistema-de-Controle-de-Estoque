using Back_end.Models;
using Back_end.Services;
using Microsoft.AspNetCore.Mvc;

namespace Back_end.Controllers
{
    [ApiController]
    [Route("Controller")]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;

        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpGet("/GetAllExpenses")]
        public async Task<IActionResult> GetAllExpenses()
        {
            var expenses = await _expenseService.GetAllExpenses();

            if (expenses.Count == 0)
            {
                return NotFound("No expense found");
            }
            return Ok(expenses);
        }

        [HttpGet("/GetExpense/{id}")]
        public async Task<IActionResult> GetExpenseById(int id)
        {
            var expense = await _expenseService.GetExpenseById(id);

            if (expense == null)
            {
                return NotFound($"No expense with id: {id} found");
            }
            return Ok(expense);
        }

        [HttpPost("/AddExpense")]
        public async Task<IActionResult> AddExpense(Expense expense)
        {
            await _expenseService.AddExpense(expense);

            return Ok(expense);
        }

        [HttpPut("/UpdateExpense/{id}")]
        public async Task<IActionResult> UpdateExpense(int id, Expense newExpense)
        {
            var expense = await _expenseService.GetExpenseById(id);

            if (expense == null)
            {
                return NotFound($"No expense with id: {id} found");
            }
            expense.UpdateExpense(newExpense);
            await _expenseService.UpdateExpense(expense);

            return Ok("Expense updated");
        }

        // For development purposes
        [HttpDelete("/DeleteExpense/{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var expense = await _expenseService.GetExpenseById(id);

            if (expense == null)
            {
                return NotFound($"No expense with id: {id} found");
            }
            await _expenseService.DeleteExpense(expense);

            return NoContent();
        }

    }
}