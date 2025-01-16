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
            var product = await _context.Products.FindAsync(id);

            return product;
        }

        public async Task<List<Product>> GetProductsByCategory(Category category)
        {
            var products = await _context.Products.Where(p => p.Categories.Contains(category)).ToListAsync();

            return products;
        }

        public async Task<List<Product>> GetProductsBySupplier(Supplier supplier)
        {
            var products = await _context.Products.Where(p => p.Supplier == supplier).ToListAsync();

            return products;
        }

        public async Task AddProduct(ProductDTO productDTO)
        {
            var product = new Product(productDTO);

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProduct(int id, ProductDTO productDTO)
        {
            var product = await _context.Products.FindAsync(id);
            product.UpdateProduct(productDTO);

            _context.Products.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
    }
}