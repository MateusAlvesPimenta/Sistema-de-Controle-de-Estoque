using Back_end.DTOs;
using Back_end.Models;

namespace Back_end.Services
{
    public interface ISaleService
    {
        Task<List<Sale>> GetAllSales();
        Task<Sale> GetSaleById(int id);
        Task<Sale> AddSale(SaleDTO saleDTO);
        Task UpdateSale(Sale sale);
        Task DeleteSale(Sale sale);
    }
}