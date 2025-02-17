using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Back_end.Models
{
    public class SaleItem
    {
        [Key]
        public int SaleItemId { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        [Range(0, double.MaxValue)]
        public int Price { get; set; }
        [JsonIgnore]
        public Sale Sale { get; set; }
        [Required]
        public int SaleId { get; set; }
        [JsonIgnore]
        public Product Product { get; set; }
        [Required]
        public int ProductId { get; set; }
    }
}