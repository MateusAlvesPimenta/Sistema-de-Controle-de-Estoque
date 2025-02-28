using System.ComponentModel.DataAnnotations;

namespace Back_end.DTOs
{
    public class SaleDTO
    {
        [Required]
        public string CustomerName { get; set; }
        [Required]
        public List<SaleItemDTO> SaleItemDTOs { get; set; }
    }
}