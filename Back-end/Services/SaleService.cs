using Back_end.Context;
using Back_end.DTOs;
using Back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Services
{
    public class SaleService : ISaleService
    {
        private readonly MyAppContext _context;

        public SaleService(MyAppContext context)
        {
            _context = context;
        }

        public async Task<List<Sale>> GetAllSales()
        {
            var sales = await _context.Sales.ToListAsync();

            return sales;
        }

        public async Task<Sale> GetSaleById(int id)
        {
            var sale = await _context.Sales.FindAsync(id);

            return sale;
        }

        public async Task<Sale> AddSale(SaleDTO saleDTO)
        {
            var sale = new Sale(saleDTO);

            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();

            return sale;
        }

        public async Task UpdateSale(Sale sale)
        {
            _context.Entry(sale).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSale(Sale sale)
        {
            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();
        }
    }
}