using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Back_end.DTOs;

namespace Back_end.Models
{
    public class SaleItem
    {
        [Key]
        public int SaleItemId { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }
        [JsonIgnore]
        public Sale Sale { get; set; }
        [Required]
        public int SaleId { get; set; }
        [JsonIgnore]
        public Product Product { get; set; }
        [Required]
        public int ProductId { get; set; }

        public SaleItem() { }

        public SaleItem(SaleItemDTO saleItemDTO)
        {
            Quantity = saleItemDTO.Quantity;
            SaleId = saleItemDTO.SaleId;
            ProductId = saleItemDTO.ProductId;
        }

        public void CalculatePrice()
        {
            Price = Quantity * Product.Price;
        }
    }
}