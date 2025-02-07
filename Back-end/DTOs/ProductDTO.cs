using System.ComponentModel.DataAnnotations;

namespace Back_end.DTOs
{
    public class ProductDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public int SupplierId { get; set; }
    }
}