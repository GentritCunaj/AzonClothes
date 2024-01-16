using System.ComponentModel.DataAnnotations.Schema;

namespace Azon.Models
{
    public class StockOption
    {
        public int StockOptionId { get; set; }

        public string Size { get; set; }
        public int StockQuantity { get; set; }

        public int ColorVariantId { get; set; }
 
        public virtual ColorVariant? ColorVariant { get; set; }
    }
}
