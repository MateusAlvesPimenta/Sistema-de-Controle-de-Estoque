using Microsoft.EntityFrameworkCore;
using Back_end.Context;
using Back_end.Models;

namespace Back_end.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly MyAppContext _context;

        public CategoryService(MyAppContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return categories;
        }

        public async Task<Category> GetCategoryById(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            return category;
        }

        public async Task<Category> AddCategory(string name)
        {
            var newCategory = new Category(name);
            
            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();

            return newCategory;
        }

        public async Task UpdateCategory(Category category)
        {
            _context.Categories.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategory(Category category)
        {
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}