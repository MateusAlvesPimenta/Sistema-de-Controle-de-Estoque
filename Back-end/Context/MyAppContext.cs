using Back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Context
{
    public class MyAppContext : DbContext
    {
        public MyAppContext(DbContextOptions<MyAppContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
            .HasOne(product => product.Supplier)
            .WithMany();

            modelBuilder.Entity<ProductCategory>()
            .HasKey(productCategory => new
            {
                productCategory.CategoryId,
                productCategory.ProductId
            });

            modelBuilder.Entity<Product>()
            .HasMany(product => product.Categories)
            .WithMany(category => category.Products)
            .UsingEntity<ProductCategory>();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
    }
}