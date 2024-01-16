using Stripe;

namespace Azon.Models
{
    public interface IStripeService
    {
        Task<PaymentIntent> CreatePaymentIntentAsync(string paymentMethodId, decimal amount, string currency);
    }

}
