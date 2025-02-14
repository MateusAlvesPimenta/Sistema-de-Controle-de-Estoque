using Back_end.DTOs;
using Back_end.Models;
using Back_end.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Back_end.Controllers
{
    [ApiController]
    [Route("Controller")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("/GetAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();

            if (products.Count == 0)
            {
                return NotFound("No Product found");
            }
            return Ok(products);
        }

        [HttpGet("/GetProduct/{id}")]
        public async Task<IActionResult> GetProductsById(int id)
        {
            var product = await _productService.GetProductById(id);

            if (product == null)
            {
                return NotFound($"Not product found with the id: {id}");
            }
            return Ok(product);
        }

        [HttpGet("/GetProducts/NameOrSupplier")]
        public async Task<IActionResult> GetProductsByNameOrSupplier(
            [FromQuery] string name,
            string supplierIds)
        {
            
            var products = new List<Product>();

            if (string.IsNullOrWhiteSpace(name) && string.IsNullOrWhiteSpace(supplierIds))
            {
                Console.WriteLine("Zerados");
                products = await _productService.GetAllProducts();
            }
            else if (!string.IsNullOrWhiteSpace(name) && string.IsNullOrWhiteSpace(supplierIds))
            {
                Console.WriteLine("nome");
                products = await _productService.GetProductsByNameOrSupplier(name);
            }
            else if (string.IsNullOrWhiteSpace(name) && !string.IsNullOrWhiteSpace(supplierIds))
            {
                var ids = supplierIds.Split(',').Select(int.Parse).ToList();
                Console.WriteLine("ids");
                products = await _productService.GetProductsByNameOrSupplier(ids);
            }
            else
            {
                var ids = supplierIds.Split(',').Select(int.Parse).ToList();
                Console.WriteLine("Nome e ids");
                products = await _productService.GetProductsByNameOrSupplier(name, ids);
            }

            if (products == null || products.Count == 0)
            {
                return NotFound($"No products found with this filter");
            }
            return Ok(products);
        }

        [HttpPost("/AddProduct")]
        public async Task<IActionResult> AddProduct(ProductDTO productDTO)
        {
            var product = await _productService.AddProduct(productDTO);

            if (product == null)
            {
                return NotFound($"No supplier found with the id: {productDTO.SupplierId}");
            }

            return CreatedAtAction(nameof(GetProductsById), new { id = product.ProductId }, product);
        }

        [HttpPost("/AddProductList")]
        public async Task<IActionResult> AddProductList(List<ProductDTO> productDTO)
        {
            if (productDTO == null || productDTO.Count == 0)
            {
                return BadRequest("Insert a list of products");
            }
            var productsAdded = await _productService.AddProductList(productDTO);

            return Ok(productsAdded);
        }

        [HttpPut("/UpdateProduct/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductDTO productDTO)
        {
            var product = await _productService.GetProductById(id);

            if (product == null)
            {
                return NotFound($"No product found with the id: {id}");
            }
            product.UpdateProduct(productDTO);

            await _productService.UpdateProduct(product);

            return Ok("Product updated");
        }

        [HttpDelete("/DeleteProduct/{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _productService.GetProductById(id);

            if (product == null)
            {
                return NotFound($"No products found with the id: {id}");
            }
            await _productService.DeleteProduct(product);

            return NoContent();
        }
    }
}