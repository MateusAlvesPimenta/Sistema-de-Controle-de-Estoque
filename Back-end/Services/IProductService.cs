using Back_end.DTOs;
using Back_end.Models;

namespace Back_end.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
        Task<List<Product>> GetProductsBySupplier(int id);
        Task<Product> AddProduct(ProductDTO productDTO);
        Task<List<Product>> AddProductList(List<ProductDTO> productDTO);
        Task UpdateProduct(Product product);
        Task DeleteProduct(Product product);
    }
}