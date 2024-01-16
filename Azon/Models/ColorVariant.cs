using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Azon.Models
{
    public class ColorVariant
    {
        public int ColorVariantId { get; set; }
        public string HexCode { get; set; }

        public string? PicturePath { get; set; }
        public List<StockOption> StockOptions { get; set; } = new List<StockOption>();

        public int ProductId { get; set; }
  
        public virtual Product? Product { get; set; }


        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [NotMapped]
        public IFormFile? Image { get; set; }
    }
}
