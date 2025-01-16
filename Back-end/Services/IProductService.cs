using Back_end.DTOs;
using Back_end.Models;

namespace Back_end.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
        Task<List<Product>> GetProductsByCategory(Category category);
        Task<List<Product>> GetProductsBySupplier(Supplier supplier);
        Task AddProduct(ProductDTO productDTO);
        Task UpdateProduct(int id, ProductDTO productDTO);
        Task DeleteProduct(int id);
    }
}