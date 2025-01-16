using System.ComponentModel.DataAnnotations;

namespace Back_end.Models
{
    public class Supplier
    {
        [Key]
        public int SupplierId { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(300)]
        public string Address { get; set; }

        public void UpdateSupplier(Supplier supplier)
        {
            Name = supplier.Name;
            PhoneNumber = supplier.PhoneNumber;
            Email = supplier.Email;
            Address = supplier.Address;
        }

    }
}