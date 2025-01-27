using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Back_end.DTOs;

namespace Back_end.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(500)]
        public string Description { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int SupplierId { get; set; }
        [JsonIgnore]
        public Supplier Supplier { get; set; }
        public List<Category> Categories { get; set; } = new List<Category>();

        public Product() {}
        public Product(ProductDTO productDTO)
        {
            UpdateProduct(productDTO);
        }

        public void UpdateProduct(ProductDTO productDTO)
        {
            Name = productDTO.Name;
            Description = productDTO.Description;
            Price = productDTO.Price;
            Quantity = productDTO.Quantity;
            SupplierId = productDTO.SupplierId;
        }
    }
}