using System.ComponentModel.DataAnnotations;

namespace Back_end.Models
{
    public class Expense
    {
        [Key]
        public int ExpenseId { get; set; }
        [Required]
        [StringLength(150)]
        public string Name { get; set; }
        [Required]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }
        [Required]
        public DateTime ExpenseDate { get; set; } = DateTime.UtcNow;

        public void UpdateExpense(Expense expense)
        {
            Name = expense.Name;
            Price = expense.Price;
            ExpenseDate = expense.ExpenseDate;
        }
    }
}