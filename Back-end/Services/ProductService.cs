using Back_end.Context;
using Back_end.DTOs;
using Back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Services
{
    public class ProductService : IProductService
    {
        private readonly MyAppContext _context;

        public ProductService(MyAppContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            var products = await _context.Products.ToListAsync();

            return products;
        }

        public async Task<Product> GetProductById(int id)
        {
            var product = await _context.Products
                                        .Where(p => p.ProductId == id)
                                        .FirstOrDefaultAsync();

            return product;
        }

        public async Task<List<Product>> GetProductsByNameOrSupplier(string name)
        {
            var products = await _context.Products
                                                .Where(p => p.Name.Contains(name))
                                                .ToListAsync();

            return products;
        }

        public async Task<List<Product>> GetProductsByNameOrSupplier(List<int> supplierIds)
        {
            var exists = await _context.Suppliers.AnyAsync(s => supplierIds.Contains(s.SupplierId));

            if (!exists)
            {
                return null;
            }
            var products = await _context.Products
                                            .Where(p => supplierIds.Contains(p.SupplierId))
                                            .ToListAsync();

            return products;
        }

        public async Task<List<Product>> GetProductsByNameOrSupplier(string name, List<int> supplierIds)
        {
            var exists = await _context.Suppliers.AnyAsync(s => supplierIds.Contains(s.SupplierId));

            if (!exists)
            {
                return null;
            }
            var products = await _context.Products
                                            .Where(p => supplierIds.Contains(p.SupplierId) && p.Name.Contains(name))
                                            .ToListAsync();

            return products;
        }

        public async Task<Product> AddProduct(ProductDTO productDTO)
        {
            var product = new Product(productDTO);
            var supplierExists = await _context.Suppliers.AnyAsync(s => s.SupplierId == productDTO.SupplierId);

            if (!supplierExists)
            {
                return null;
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<List<Product>> AddProductList(List<ProductDTO> productDTO)
        {
            var productsAdded = new List<Product>();

            foreach (var product in productDTO)
            {
                var success = await AddProduct(product);
                if (success != null)
                {
                    productsAdded.Add(success);
                }
            }
            return productsAdded;
        }

        public async Task UpdateProduct(Product product)
        {
            _context.Products.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProduct(Product product)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
}