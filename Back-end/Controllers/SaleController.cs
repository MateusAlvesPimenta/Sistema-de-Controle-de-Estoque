using Back_end.DTOs;
using Back_end.Models;
using Back_end.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back_end.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SaleController : ControllerBase
    {
        private readonly ISaleService _saleService;

        public SaleController(ISaleService saleService)
        {
            _saleService = saleService;
        }

        // Sale endpoints
        [HttpGet("GetAllSales")]
        public async Task<IActionResult> GetAllSales()
        {
            var sales = await _saleService.GetAllSales();

            if (sales.Count <= 0)
            {
                return NotFound("No sale found");
            }
            return Ok(sales);
        }

        [HttpGet("GetSale/{id}")]
        public async Task<IActionResult> GetSaleById(int id)
        {
            var sale = await _saleService.GetSaleById(id);

            if (sale == null)
            {
                return NotFound($"No sale with the id: {id} found");
            }
            return Ok(sale);
        }

        [HttpGet("GetSalesByDate")]
        public async Task<IActionResult> GetSalesByDate([FromQuery]SaleExpenseDateDTO dateDTO)
        {
            var sales = await _saleService.GetSalesByDate(dateDTO.InitialDate, dateDTO.LastDate);

            if (sales.Count <= 0)
            {
                return NotFound($"No sales were made during this period:{dateDTO.InitialDate} - {dateDTO.LastDate}");
            }
            return Ok(sales);
        }

        // SaleItem endpoints
        [HttpGet("GetAllSaleItems")]
        public async Task<IActionResult> GetAllSaleItems()
        {
            var saleItems = await _saleService.GetAllSaleItems();

            if (saleItems.Count <= 0)
            {
                return NotFound("No sale item found");
            }
            return Ok(saleItems);
        }

        [HttpGet("GetSaleItem/{id}")]
        public async Task<IActionResult> GetSaleItemById(int id)
        {
            var saleItem = await _saleService.GetSaleItemById(id);

            if (saleItem == null)
            {
                return NotFound($"No sale item with id: {id} found");
            }
            return Ok(saleItem);
        }

        [HttpGet("GetSaleItems/{saleId}")]
        public async Task<IActionResult> GetSaleItemBySaleId(int saleId)
        {
            var saleItems = await _saleService.GetSaleItemsBySaleId(saleId);

            if (saleItems == null)
            {
                return NotFound($"No sale with id: {saleId} found");
            }
            if (saleItems.Count <= 0)
            {
                return NotFound($"No sale item with saleId: {saleId} found");
            }
            return Ok(saleItems);
        }

        // Shared endpoints
        [HttpPost("AddSale")]
        public async Task<IActionResult> AddSale(SaleDTO saleDTO)
        {
            var saleReport = await _saleService.AddSaleAndSaleItem(saleDTO.CustomerName, saleDTO.SaleItemDTOs);

            return CreatedAtAction(nameof(GetSaleById), new { id = saleReport.Sale.SaleId }, saleReport);
        }

        // For development purposes
        [HttpDelete("RemoveEmptySales")]
        public async Task<IActionResult> RemoveEmptySales()
        {
            var emptySales = await _saleService.RemoveEmptySales();

            if (emptySales.Count <= 0)
            {
                return NotFound("No empty sale found");
            }
            return Ok(emptySales);
        }

        [HttpPut("SaleSaleItemPriceAndQuantityFix")]
        public async Task<IActionResult> SaleSaleItemPriceAndQuantityFix(int saleId)
        {
            var sale = await _saleService.GetSaleById(saleId);
            if (sale == null)
            {
                return NotFound($"No sale with id: {saleId} found");
            }
            var updatedSale = await _saleService.SaleSaleItemPriceAndQuantityFix(sale);
            if (updatedSale == null)
            {
                return NotFound($"No saleItems linked to the sale with id: {saleId} found");
            }
            return Ok(updatedSale);
        }

        [HttpDelete("DeleteSale/{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            var sale = await _saleService.GetSaleById(id);
            var saleItems = await _saleService.GetSaleItemsBySaleId(id);

            if (sale == null)
            {
                return NotFound($"No sale with id: {id} found");
            }
            await _saleService.DeleteSale(sale, saleItems);

            return Ok(new { sale, saleItems });
        }
    }
}