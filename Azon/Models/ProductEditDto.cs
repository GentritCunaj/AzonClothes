using Azon.Areas.Identity.Data;
using ShoppingEcommerce.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Azon.Models
{
    public class ProductEditDto
    {
      
        public string? Name {  get; set; }
        public decimal? Price { get; set; }
        public decimal? OldPrice { get; set; }
       

        public List<ColorVariant> ColorVariants { get; set; } = new List<ColorVariant>();

        public string? Description { get; set; }


    




    }
}
