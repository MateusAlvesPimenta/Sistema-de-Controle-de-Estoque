using Back_end.DTOs;
using Back_end.Models;

namespace Back_end.Services
{
    public interface ISaleService
    {
        // Sale Services
        Task<List<Sale>> GetAllSales();
        Task<Sale> GetSaleById(int id);
        Task<List<Sale>> RemoveEmptySales();

        // SaleItem Services
        Task<List<SaleItem>> GetAllSaleItems();
        Task<SaleItem> GetSaleItemById(int id);
        Task<List<SaleItem>> GetSaleItemsBySaleId(int saleId);

        // Shared services
        Task<SaleReport> AddSaleAndSaleItem(string customerName, List<SaleItemDTO> saleItems);
        Task<(Sale Sale, List<SaleItem> SaleItems)> SaleSaleItemPriceAndQuantityFix(Sale sale);

        // For development purposes
        Task DeleteSale(Sale sale);
        Task DeleteSaleItem(SaleItem saleItem);
    }
}