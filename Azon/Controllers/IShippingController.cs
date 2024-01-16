using Azon.Models;
using Microsoft.AspNetCore.Mvc;
using ShoppingEcommerce.Models;

namespace ClientShopping.Controllers
{
    public interface IShippingController
    {
        Task<ActionResult<ServiceResponse<ShippingDetail>>> GetShipping([FromForm] string? guid);
        Task<ActionResult<ServiceResponse<string>>> AddShipping(ShippingDetailDto shippingDetail);
    }
}