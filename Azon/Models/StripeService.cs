using Microsoft.Extensions.Options;
using Stripe;

namespace Azon.Models
{
    public class StripeService:IStripeService
    {
        private readonly StripeSettings _stripeSettings;

        public StripeService(IOptions<StripeSettings> stripeSettings)
        {
            _stripeSettings = stripeSettings.Value;
        }

        public async Task<PaymentIntent> CreatePaymentIntentAsync(string paymentMethodId, decimal amount, string currency)
        {
            var stripe = new StripeClient(_stripeSettings.SecretKey);
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)amount * 100, // Amount in cents
                Currency = currency,
                PaymentMethod = paymentMethodId
            };
            var service = new PaymentIntentService(stripe);
            return await service.CreateAsync(options);
        }
    }
}
