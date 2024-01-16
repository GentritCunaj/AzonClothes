using Azon.Areas.Identity.Data;
using ShoppingEcommerce.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Azon.Models
{
    public class productDto
    {
        public string Name { get; set; }
        public string ColorHexCode { get; set; }
        public string Size { get; set; }
        public int StockQuantity { get; set; }
        public decimal? Price { get; set; }
        public decimal? OldPrice { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public IFormFile? ImageFile { get; set; }

        public string? Description { get; set; }

        public string? PicturePath { get; set; }

        public bool isAvailabe { get; set; }


        [Column(TypeName = "nvarchar(max)")]
        public string? Vector { get; set; }

        public string? Notes { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public IFormFile? DesignFile { get; set; }







    }
}
