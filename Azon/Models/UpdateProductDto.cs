using Azon.Areas.Identity.Data;
using ShoppingEcommerce.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Azon.Models
{
    public class UpdateProductDto
    {
     
        public string Size { get; set; }
       
        public decimal? Price { get; set; }
        public decimal? OldPrice { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }
        public int? inStock { get; set; }

        public string? Description { get; set; }

   

    }
}
