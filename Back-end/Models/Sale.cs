using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Back_end.Models
{
    public class Sale
    {
        [Key]
        public int SaleId { get; set; }
        [Required]
        public DateTime SaleDate { get; set; } = DateTime.UtcNow;
        [Required]
        public string CustomerName { get; set; }
        [Required]
        [Range(0, double.MaxValue)]
        public decimal Total { get; set; } = 0;
        [JsonIgnore]
        public List<SaleItem> SaleItems { get; set; }

        public Sale() { }

        public Sale(string customerName)
        {
            CustomerName = customerName;
        }

        public void CalculateTotal(List<SaleItem> saleItems)
        {
            decimal accumulator = 0;
            Total = saleItems.Aggregate(accumulator, (total, next) => total += next.Price);
        }
    }
}