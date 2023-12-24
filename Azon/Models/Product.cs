using Azon.Areas.Identity.Data;
using ShoppingEcommerce.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Azon.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string? CustomerId { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Type {  get; set; }
        public decimal? Price { get; set; }
        public decimal? OldPrice { get; set; }
        public decimal? Discount { get; set; }

        public int? inStock { get; set; }

        public string? Description { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string? Vector { get; set; }

        public string? Notes { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }

        public string? PicturePath { get; set; }

        public ApplicationUser? Customer { get; set; }

        public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();


    }
}
