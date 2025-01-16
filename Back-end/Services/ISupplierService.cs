using Back_end.Models;

namespace Back_end.Services
{
    public interface ISupplierService
    {
        Task<List<Supplier>> GetAllSuppliers();
        Task<Supplier> GetSupplierById(int id);
        Task AddSupplier(Supplier supplier);
        Task UpdateSupplier(int id, Supplier supplier);
        Task DeleteSupplier(int id);
    }
}