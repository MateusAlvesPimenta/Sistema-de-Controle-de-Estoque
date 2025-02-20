using Back_end.DTOs;
using Back_end.Models;

namespace Back_end.Services
{
    public interface ISaleService
    {
        // Sale Services
        Task<List<Sale>> GetAllSales();
        Task<Sale> GetSaleById(int id);

        // SaleItem Services
        Task<List<SaleItem>> GetAllSaleItems();
        Task<SaleItem> GetSaleItemById(int id);

        // Shared services
        Task<Sale> AddSaleAndSaleItem(string customerName, List<SaleItemDTO> saleItems);

        // For development purposes
        Task DeleteSale(Sale sale);
        Task DeleteSaleItem(SaleItem saleItem);
    }
}