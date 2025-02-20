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

        // Sale services
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

        // SaleItem services
        public async Task<List<SaleItem>> GetAllSaleItems()
        {
            var salesItems = await _context.SaleItems.ToListAsync();

            return salesItems;
        }

        public async Task<SaleItem> GetSaleItemById(int id)
        {
            var saleItem = await _context.SaleItems.FindAsync(id);

            return saleItem;
        }

        // Shared services
        public async Task<Sale> AddSaleAndSaleItem(string customerName, List<SaleItemDTO> saleItemsDTOs)
        {
            // Verify if the product exists, if not it removes the SaleItem from the list
            for(int i = 0; i < saleItemsDTOs.Count; i++)
            {
                var productExists = await _context.Products.AnyAsync(product => product.ProductId == saleItemsDTOs[i].ProductId);
                if (!productExists)
                {
                    saleItemsDTOs.RemoveAt(i);
                    i--;
                }
            }

            if (saleItemsDTOs.Count <= 0)
            {
                return null;
            }

            // Posts the Sale to obtain the id
            var sale = new Sale(customerName);

            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();

            // Posts each SaleItem to get the information of its respective product
            foreach (SaleItemDTO item in saleItemsDTOs)
            {
                item.SaleId = sale.SaleId;

                var saleItem = new SaleItem(item);

                _context.SaleItems.Add(saleItem);
                await _context.SaveChangesAsync();
            }
            var saleItems = await _context.SaleItems
                                            .Where(saleItem => saleItem.SaleId == sale.SaleId)
                                            .Include(saleItem => saleItem.Product)
                                            .ToListAsync();

            // Calculates money related information and saves
            foreach (SaleItem item in saleItems)
            {
                item.CalculatePrice();
                _context.Entry(item).State = EntityState.Modified;
            }
            sale.CalculateTotal(saleItems);

            _context.Entry(sale).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return sale;
        }

        // For development purposes
        public async Task DeleteSale(Sale sale)
        {
            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSaleItem(SaleItem saleItem)
        {
            _context.SaleItems.Remove(saleItem);
            await _context.SaveChangesAsync();
        }
    }
}