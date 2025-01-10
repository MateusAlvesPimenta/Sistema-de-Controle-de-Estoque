using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Back_end.Models
{
    public class ProductCategory
    {
        public int ProductId { get; set; }  
        public Product Product { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; } 
    }
}