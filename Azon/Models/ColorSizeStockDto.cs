using System.ComponentModel.DataAnnotations.Schema;

namespace Azon.Models
{
    public class ColorSizeStockDto
    {
        public string HexCode { get; set; }
        public List<string> Sizes { get; set; }

        public int Stock {  get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        
    }
}
