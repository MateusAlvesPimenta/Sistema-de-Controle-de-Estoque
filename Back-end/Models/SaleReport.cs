using Back_end.DTOs;

namespace Back_end.Models
{
    public struct SaleReport
    {
        public string NotFoundMessage { get; set; }
        public List<SaleItemDTO> ProductsNotFound { get; set; }
        public string InsufficientStockMessage { get; set; }
        public List<SaleItemDTO> ProductsWithInsufficientStock { get; set; }
        public string SoldMessage { get; set; }
        public List<SaleItemDTO> ProductsSold { get; set; }
    }
}