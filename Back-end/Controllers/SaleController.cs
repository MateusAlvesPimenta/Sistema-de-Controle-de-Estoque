using Back_end.DTOs;
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
                return NotFound($"No sale found with the id: {id}");
            }
            return Ok(sale);
        }

        [HttpPost("/AddSale")]
        public async Task<IActionResult> AddSale(SaleDTO saleDTO)
        {
            var sale = await _saleService.AddSale(saleDTO);

            return CreatedAtAction(nameof(GetSaleById), new { id = sale.SaleId }, sale);
        }

        [HttpPut("/UpdateSale/{id}")]
        public async Task<IActionResult> UpdateSale(int id, string customerName)
        {
            var sale = await _saleService.GetSaleById(id);

            if (sale == null)
            {
                return NotFound($"No sale found with the id: {id}");
            }
            sale.UpdateSale(customerName);

            await _saleService.UpdateSale(sale);

            return Ok("Customer name updated");
        }

        [HttpDelete("/DeleteSale/{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            var sale = await _saleService.GetSaleById(id);

            if (sale == null)
            {
                return NotFound($"No sale found with id: {id}");
            }
            return NoContent();
        }
    }
}