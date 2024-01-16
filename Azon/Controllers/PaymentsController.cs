using Azon.Areas.Identity.Data;
using Azon.Data;
using Azon.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Security.Claims;

namespace Azon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase, IPaymentsController
    {
        private readonly IStripeService _stripeService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly AzonContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthentication _authentication;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PaymentsController(IStripeService stripeService, IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, IAuthentication authentication, SignInManager<ApplicationUser> signInManager, AzonContext context)
        {
            _context = context;
            _stripeService = stripeService;
            _authentication = authentication;
            _userManager = userManager;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;

        }

        [HttpPost]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] PaymentIntentDto model)
        {
            var nameIdentifier = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            Wishlist wishlist = null;
            ShippingDetail shipping = null;
            Wishlist productwishlist = null;    
           

            ApplicationUser customer = null;
            if (nameIdentifier != null)
            {
                customer = await _context.Users.FirstOrDefaultAsync(u => u.Id == nameIdentifier);
            
            }
            else
            {
                if (model.Guid != null)
                {
                    nameIdentifier = model.Guid;
                                  

                }
            }
            wishlist = await _context.Wishlists.Where(c => c.CustomerId == nameIdentifier).Include(w => w.Items).ThenInclude(p => p.OriginalProduct).ThenInclude(p => p.ColorVariants).ThenInclude(p => p.StockOptions).Where(c => c.isCompleted == false).FirstOrDefaultAsync();
            shipping = await _context.ShippingDetails.Where(s => s.CustomerId == nameIdentifier).FirstOrDefaultAsync();
            productwishlist = await _context.Wishlists.Where(c => c.CustomerId == nameIdentifier).Include(w => w.Items).ThenInclude(p => p.Product).ThenInclude(p => p.ColorVariants).ThenInclude(p => p.StockOptions).Where(c => c.isCompleted == false).FirstOrDefaultAsync();


            // Validate and process the payment
            if (model.Currency != null && model.PaymentMethodId != null)
            {

                var paymentIntent = await _stripeService.CreatePaymentIntentAsync(model.PaymentMethodId, model.Amount, model.Currency);

                if (paymentIntent != null)
                {


                    Order o = new Order
                    {
                        CustomerId = nameIdentifier,
                        ShippingId = shipping.ShippingDetailId,

                        OrderStatus = Order.OrderStatusEnum.Pending,
                        Customer = customer,
                        Shipping = shipping,

                        CreatedDate = DateTime.UtcNow,
                        WishlistId = wishlist.WishlistId,
                        TotalAmount = model.Amount,
                        Wishlist = wishlist,
                        PaymentIntentId = paymentIntent.Id,
                        Status = paymentIntent.Status,
                        PayOnDelivery = false

                    };
                    _context.Orders.Add(o);
                    wishlist.isCompleted = true;
                    await _context.SaveChangesAsync();

                }
                return Ok(new { clientSecret = paymentIntent.ClientSecret, success = true });
            }
            else
            {

                Order o = new Order
                {
                    CustomerId = nameIdentifier,
                    ShippingId = shipping.ShippingDetailId,

                    OrderStatus = Order.OrderStatusEnum.Pending,
                   
                    Shipping = shipping,

                    CreatedDate = DateTime.UtcNow,
                    WishlistId = wishlist.WishlistId,
                    TotalAmount = model.Amount,
                    Wishlist = wishlist,


                    PayOnDelivery = true

                };
                if (customer != null)
                {
                    o.Customer = customer;
                }
                _context.Orders.Add(o);
                wishlist.isCompleted = true;
                foreach (var item in wishlist.Items)
                {
                    if (item.OriginalProduct == null)
                    {
                        // Handle null product
                        continue;
                    }

                    foreach (var colorVariant in item.OriginalProduct.ColorVariants)
                    {
                        foreach (var stockOption in colorVariant.StockOptions)
                        {
                            // Decrease the stock quantity based on the count in the wishlist item
                            if (stockOption.Size == productwishlist.Items[0].Product.ColorVariants[0].StockOptions[0].Size)
                            {
                                stockOption.StockQuantity -= item.Count;

                                // Ensure stock doesn't go below zero
                                if (stockOption.StockQuantity < 0)
                                {
                                    stockOption.StockQuantity = 0;
                                }
                            }

                        }
                    }

                }
              /*  foreach (var wishlistItem in wishlist.Items.ToList())
                {
                    _context.WishlistItems.Remove(wishlistItem);
                    _context.Products.Remove(wishlistItem.Product);

                }*/
                await _context.SaveChangesAsync();
            }

            return Ok("Payment on Delivery created");
        }


    }
}
