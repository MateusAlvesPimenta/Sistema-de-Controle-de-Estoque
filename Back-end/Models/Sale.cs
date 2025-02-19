using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Back_end.DTOs;

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
        public int Total { get; set; }
        [JsonIgnore]
        public List<SaleItem> SaleItems { get; set; }

        public Sale() { }

        public Sale(SaleDTO saleDTO)
        {
            CustomerName = saleDTO.CustomerName;
            Total = saleDTO.Total;
        }

        public void UpdateSale(string customerName)
        {
            CustomerName = customerName;
        }
    }
}