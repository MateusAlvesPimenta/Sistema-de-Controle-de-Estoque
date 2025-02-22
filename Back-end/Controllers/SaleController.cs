using Back_end.DTOs;
using Back_end.Models;
using Back_end.Services;
using Microsoft.AspNetCore.Mvc;

namespace Back_end.Controllers
{
    [ApiController]
    [Route("Controller")]

    public class SaleController : ControllerBase
    {
        private readonly ISaleService _saleService;

        public SaleController(ISaleService saleService)
        {
            _saleService = saleService;
        }

        // Sale endpoints
        [HttpGet("/GetAllSales")]
        public async Task<IActionResult> GetAllSales()
        {
            var sales = await _saleService.GetAllSales();

            if (sales.Count == 0)
            {
                return NotFound("No sale found");
            }
            return Ok(sales);
        }

        [HttpGet("/GetSale/{id}")]
        public async Task<IActionResult> GetSaleById(int id)
        {
            var sale = await _saleService.GetSaleById(id);

            if (sale == null)
            {
                return NotFound($"No sale with the id: {id} found");
            }
            return Ok(sale);
        }

        // SaleItem endpoints
        [HttpGet("/GetAllSaleItems")]
        public async Task<IActionResult> GetAllSaleItems()
        {
            var saleItems = await _saleService.GetAllSaleItems();

            if (saleItems.Count == 0)
            {
                return NotFound("No sale item found");
            }
            return Ok(saleItems);
        }

        [HttpGet("/GetSaleItem/{id}")]
        public async Task<IActionResult> GetSaleItemById(int id)
        {
            var saleItem = await _saleService.GetSaleItemById(id);

            if (saleItem == null)
            {
                return NotFound($"No sale item with id: {id} found");
            }
            return Ok(saleItem);
        }

        // Shared endpoints
        [HttpPost("/AddSale")]
        public async Task<IActionResult> AddSale(string customerName, List<SaleItemDTO> saleItemDTOs)
        {
            var saleReport = await _saleService.AddSaleAndSaleItem(customerName, saleItemDTOs);

            return CreatedAtAction(nameof(GetSaleById), new { id = saleReport.Sale.SaleId }, saleReport);
        }

        // For development purposes
        [HttpDelete("/DeleteSale/{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            var sale = await _saleService.GetSaleById(id);

            if (sale == null)
            {
                return NotFound($"No sale with id: {id} found");
            }
            return NoContent();
        }
    }
}