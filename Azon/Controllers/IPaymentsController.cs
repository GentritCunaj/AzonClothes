using Azon.Models;
using Microsoft.AspNetCore.Mvc;

namespace Azon.Controllers
{
    public interface IPaymentsController
    {
        Task<IActionResult> CreatePaymentIntent([FromBody] PaymentIntentDto model);
    }
}