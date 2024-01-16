using Azon.Areas.Identity.Data;
using ShoppingEcommerce.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Azon.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string? CustomerId { get; set; }

        public string? Name {  get; set; }
        public decimal? Price { get; set; }
        public decimal? OldPrice { get; set; }
        public decimal? Discount { get; set; }

        public List<ColorVariant> ColorVariants { get; set; } = new List<ColorVariant>();

        public string? Description { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Vector { get; set; }

        public string? Notes { get; set; }

        [NotMapped]
        public IFormFile? ImageFile { get; set; }

        public string? DesignPath { get; set; }
        public string? PicturePath { get; set; }

        public bool? isAvailable { get; set; } = false;

        public ApplicationUser? Customer { get; set; }

        public virtual ICollection<Wishlist>? Wishlists { get; set; } = new List<Wishlist>();

      
    }
}
