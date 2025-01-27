using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                                        .Include(p => p.Categories)
                                        .FirstOrDefaultAsync();

            return product;
        }

        public async Task<List<Product>> GetProductsByCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return null;
            }
            var products = await _context.Products.Where(p => p.Categories.Contains(category)).ToListAsync();

            return products;
        }

        public async Task<List<Product>> GetProductsBySupplier(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);

            if (supplier == null)
            {
                return null;
            }
            var products = await _context.Products.Where(p => p.Supplier == supplier).ToListAsync();

            return products;
        }

        public async Task<Product> AddProduct(ProductDTO productDTO)
        {
            var product = new Product(productDTO);
            var supplierExists = await _context.Suppliers.AnyAsync(s => s.SupplierId == productDTO.SupplierId);
            var categoryExists = await _context.Categories.AnyAsync(c => c.CategoryId == productDTO.CategoryId);

            if (!supplierExists || !categoryExists)
            {
                return null;
            }
            await AddCategoryToProduct(product, productDTO.CategoryId);

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
                if(success != null)
                {
                    productsAdded.Add(success);
                }
            }
            return productsAdded;
        }
        public async Task AddCategoryToProduct(Product product, int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category != null && !product.Categories.Contains(category))
            {
                product.Categories.Add(category);
            }
        }

        public async Task UpdateProduct(Product product, int categoryId)
        {
            await AddCategoryToProduct(product, categoryId);

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