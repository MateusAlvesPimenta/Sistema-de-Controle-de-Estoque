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
            var sale = await _context.Sales.Where(sale => sale.SaleId == id)
                                            .Include(sale => sale.SaleItems)
                                            .FirstOrDefaultAsync();

            return sale;
        }
        public async Task<List<Sale>> GetSalesByDate(DateTime initialDate, DateTime lastDate)
        {
            var sales = await _context.Sales.Where(sale => sale.SaleDate >= initialDate &&
                                                            sale.SaleDate <= lastDate)
                                            .ToListAsync();

            return sales;
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
        public async Task<List<SaleItem>> GetSaleItemsBySaleId(int saleId)
        {
            var saleExists = await _context.Sales.AnyAsync(sale => sale.SaleId == saleId);

            if (!saleExists)
            {
                return null;
            }
            var saleItem = await _context.SaleItems.Where(item => item.SaleId == saleId).ToListAsync();

            return saleItem;
        }

        // Shared services
        public async Task<SaleReport> AddSaleAndSaleItem(string customerName, List<SaleItemDTO> saleItemsDTOs)
        {
            var saleReport = new SaleReport();
            var sale = new Sale(customerName);
            
            saleReport.Sale = sale;

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

            // Checks if there's any saleItem left
            if (saleItemsDTOs.Count <= 0)
            {
                saleReport.SoldMessage = "No products were sold";
                return saleReport;
            }

            // Posts the Sale to obtain the id
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
            // Get the product name
            foreach (SaleItem item in saleItems)
            {
                item.CalculatePrice();
                item.Name = item.Product.Name;
                _context.SaleItems.Entry(item).State = EntityState.Modified;

                item.Product.Quantity -= item.Quantity;
                _context.Products.Entry(item.Product).State = EntityState.Modified;

                saleReport.ProductsSold.Add(item);
            }
            sale.CalculateTotal(saleItems);

            saleReport.SoldMessage = $"{saleReport.ProductsSold.Count} Products successfully sold";

            _context.Sales.Entry(sale).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return saleReport;
        }

        // For development purposes
        public async Task<List<Sale>> RemoveEmptySales()
        {
            var sales = await _context.Sales.Where(sale => sale.SaleItems.Count <= 0).ToListAsync();

            if (sales.Count > 0)
            {
                _context.Sales.RemoveRange(sales);
                await _context.SaveChangesAsync();
            }
            return sales;
        }
        public async Task<Sale> SaleSaleItemPriceAndQuantityFix(Sale sale)
        {
            var saleItems = await _context.SaleItems.Where(item => item.SaleId == sale.SaleId)
                                                    .Include(item => item.Product)
                                                    .ToListAsync();

            if (saleItems.Count <= 0)
            {
                return null;
            }

            // Aggregate saleItems with the same ProductId
            for (int i = 0; i < saleItems.Count; i++)
            {
                var saleItem = saleItems[i];

                if (saleItems.Count(item => item.ProductId == saleItem.ProductId) > 1)
                {
                    var duplicatedItems = saleItems.Where(item => item.ProductId == saleItem.ProductId).ToList();

                    saleItem = duplicatedItems.Aggregate((total, next) =>
                    {
                        total.Quantity += next.Quantity;
                        saleItems.Remove(next);

                        return total;
                    });
                }
            }

            // Calculates money related information and saves
            foreach (SaleItem item in saleItems)
            {
                item.CalculatePrice();
                item.Name = item.Product.Name;
                _context.SaleItems.Entry(item).State = EntityState.Modified;
            }
            sale.CalculateTotal(saleItems);

            _context.Sales.Entry(sale).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return sale;
        }
        public async Task DeleteSale(Sale sale, List<SaleItem> saleItems)
        {
            if (saleItems.Count > 0)
            {
                foreach (SaleItem item in saleItems)
                {
                    _context.SaleItems.Remove(item);
                }
            }
            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();
        }
    }
}