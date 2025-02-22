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
        public async Task<SaleReport> AddSaleAndSaleItem(string customerName, List<SaleItemDTO> saleItemsDTOs)
        {
            var saleReport = new SaleReport();

            // Checks if the product exists, if not it removes the saleItem from the list
            for (int i = 0; i < saleItemsDTOs.Count; i++)
            {
                var item = saleItemsDTOs[i];
                var productExists = await _context.Products.AnyAsync(product => product.ProductId == item.ProductId);
                if (!productExists)
                {
                    saleReport.ProductsNotFound.Add(item);
                    saleItemsDTOs.Remove(item);
                    i--;
                }
                else if (item.Quantity < 1)
                {
                    saleItemsDTOs.Remove(item);
                    i--;
                }
            }

            // Checks if there's any saleItem left
            if (saleItemsDTOs.Count <= 0)
            {
                saleReport.SoldMessage = "No products were sold";
                return saleReport;
            }

            // Aggregate saleItems with the same ProductId
            for (int i = 0; i < saleItemsDTOs.Count; i++)
            {
                var saleItem = saleItemsDTOs[i];
                if (saleItemsDTOs.Count(item => item.ProductId == saleItem.ProductId) > 1)
                {
                    var duplicatedItems = saleItemsDTOs.Where(item => item.ProductId == saleItem.ProductId).ToList();
                    saleItem = duplicatedItems.Aggregate((total, next) =>
                    {
                        total.Quantity += next.Quantity;
                        saleItemsDTOs.Remove(next);
                        return total;
                    });
                }
            }

            // Checks if there's enough products in stock to sell
            // if it doesn't, removes the saleItem from the list
            // if it does, subtract the quantity sold
            for (int i = 0; i < saleItemsDTOs.Count; i++)
            {
                var item = saleItemsDTOs[i];
                var product = await _context.Products.FindAsync(item.ProductId);
                if (product.Quantity < item.Quantity)
                {
                    saleReport.ProductsWithInsufficientStock.Add(item);
                    saleItemsDTOs.Remove(item);
                    i--;
                }
            }

            saleReport.NotFoundMessage = $"{saleReport.ProductsNotFound.Count} Products not found";
            saleReport.InsufficientStockMessage = $"{saleReport.ProductsWithInsufficientStock.Count} Products with insufficient stock";

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

            // Calculates money related information, subtract the product from stock and saves
            foreach (SaleItem item in saleItems)
            {
                item.CalculatePrice();
                _context.Entry(item).State = EntityState.Modified;

                item.Product.Quantity -= item.Quantity;
                _context.Entry(item.Product).State = EntityState.Modified;

                saleReport.ProductsSold.Add(item);
            }
            sale.CalculateTotal(saleItems);

            saleReport.Sale = sale;
            saleReport.SoldMessage = $"{saleReport.ProductsSold.Count} Products successfully sold";
            
            _context.Entry(sale).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return saleReport;
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