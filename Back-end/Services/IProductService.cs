using Back_end.DTOs;
using Back_end.Models;

namespace Back_end.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
        Task<List<Product>> GetProductsByNameOrSupplier(string name);
        Task<List<Product>> GetProductsByNameOrSupplier(List<int> supplierIds);
        Task<List<Product>> GetProductsByNameOrSupplier(string name, List<int> supplierId);
        Task<List<Product>> GetProductsWithLowStock();
        Task<Product> AddProduct(ProductDTO productDTO);
        Task<List<Product>> AddProductList(List<ProductDTO> productDTO);
        Task UpdateProduct(Product product);
        Task<Product> RestockProduct(Product product, int quantity);
        Task DeleteProduct(Product product);
    }
}