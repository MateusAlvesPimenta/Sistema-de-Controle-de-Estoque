using Back_end.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Context
{
    public class MyAppContext : IdentityDbContext<IdentityUser>
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
            .WithMany(sale => sale.SaleItems)
            .HasForeignKey(saleItem => saleItem.SaleId);

            modelBuilder.Entity<SaleItem>()
            .HasOne(saleItem => saleItem.Product)
            .WithMany()
            .HasForeignKey(saleItem => saleItem.ProductId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleItem> SaleItems { get; set; }
        public DbSet<Expense> Expenses { get; set; }
    }
}