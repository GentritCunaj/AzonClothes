using Azon.Areas.Identity.Data;
using ShoppingEcommerce.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Azon.Models
{
    public class AddProductDto
    {
      
        public string Color { get; set; }
        public string Size { get; set; }
        public string Type {  get; set; }
        public decimal? Price { get; set; }
        public decimal? OldPrice { get; set; }

        public int? inStock { get; set; }

        public string? Description { get; set; }

       

       

    }
}
