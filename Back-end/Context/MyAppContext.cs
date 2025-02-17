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

            modelBuilder.Entity<SaleItem>()
            .HasOne(saleItem => saleItem.Sale)
            .WithMany(sale => sale.SaleItems);

            base.OnModelCreating(modelBuilder);
        }
        
        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
    }
}