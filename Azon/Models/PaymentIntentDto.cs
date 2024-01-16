namespace Azon.Models
{
    public class PaymentIntentDto
    {
        public decimal Amount { get; set; }
        public string? Currency { get; set; }

        public string? PaymentMethodId { get; set; }

        public string? Guid {  get; set; } = null;
    }
}
