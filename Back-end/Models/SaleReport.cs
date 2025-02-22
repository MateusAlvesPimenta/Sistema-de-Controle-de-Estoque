using Back_end.DTOs;

namespace Back_end.Models
{
    public struct SaleReport
    {
        public Sale Sale { get; set; }
        public string NotFoundMessage { get; set; }
        public List<SaleItemDTO> ProductsNotFound { get; set; } = new();
        public string InsufficientStockMessage { get; set; }
        public List<SaleItemDTO> ProductsWithInsufficientStock { get; set; } = new();
        public string SoldMessage { get; set; }
        public List<SaleItem> ProductsSold { get; set; } = new();

        public SaleReport() { }
    }
}