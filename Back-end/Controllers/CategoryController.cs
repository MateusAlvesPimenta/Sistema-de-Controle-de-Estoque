using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back_end.Models;
using Back_end.Services;
using Microsoft.AspNetCore.Mvc;

namespace Back_end.Controllers
{
    [ApiController]
    [Route("/api/Controller")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("/GetAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategories();

            if (categories.Count == 0)
            {
                return NotFound("No category found");
            }
            return Ok(categories);
        }

        [HttpGet("/GetCategory/{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryService.GetCategoryById(id);

            if (category == null)
            {
                return NotFound($"No category found with the id: {id}");
            }
            return Ok(category);
        }

        [HttpPost("/AddCategory")]
        public async Task<IActionResult> AddCategory(string name)
        {
            var category = await _categoryService.AddCategory(name);

            return CreatedAtAction(nameof(GetCategoryById), new { id = category.CategoryId }, category);
        }

        [HttpPut("/UpdateCategory/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, string newName)
        {
            var category = await _categoryService.GetCategoryById(id);

            if(category == null)
            {
                return NotFound($"No category found with the id: {id}");
            }
            category.Name = newName;
            
            await _categoryService.UpdateCategory(category);                        

            return Ok("Category updated");
        }

        [HttpDelete("/DeleteCategory/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _categoryService.GetCategoryById(id);

            if(category == null)
            {
                return NotFound($"No category found with the id: {id}");
            }
            await _categoryService.DeleteCategory(category);

            return NoContent();
        }
    }
}