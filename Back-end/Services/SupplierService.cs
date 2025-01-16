using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Back_end.Context;
using Back_end.Models;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly MyAppContext _context;

        public SupplierService(MyAppContext context)
        {
            _context = context;
        }

        public async Task<List<Supplier>> GetAllSuppliers()
        {
            var suppliers = await _context.Suppliers.ToListAsync();
            return suppliers;
        }

        public async Task<Supplier> GetSupplierById(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            return supplier;
        }

        public async Task AddSupplier(Supplier supplier)
        {
            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSupplier(int id, Supplier newSupplier)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            supplier.UpdateSupplier(newSupplier);

            _context.Suppliers.Entry(supplier).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSupplier(int id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);

            _context.Suppliers.Remove(supplier);
            await _context.SaveChangesAsync();
        }
    }
}