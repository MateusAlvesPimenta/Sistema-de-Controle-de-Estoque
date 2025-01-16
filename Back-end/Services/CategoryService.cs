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

        public async Task AddCategory(string name)
        {
            var newCategory = new Category(name);
            
            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCategory(int id, string newName)
        {
            var category = await _context.Categories.FindAsync(id);
            category.Name = newName;
            
            _context.Categories.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}