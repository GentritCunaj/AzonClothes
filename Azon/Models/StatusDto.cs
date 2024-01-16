namespace Azon.Models
{
    public class StatusDto
    {
        public int OrderId { get; set; }
        public string OrderStatusName { get; set; }
        public DateTime? DeliveredDate { get; set; }

        public DateTime? ShippedDate { get; set; }
    }
}
