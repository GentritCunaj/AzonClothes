using Azon.Areas.Identity.Data;
using Azon.Data;
using Azon.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using ShoppingEcommerce.Models;
using Stripe;
using System;
using System.Security.Claims;

namespace ClientShopping.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ShippingController : ControllerBase, IShippingController
    {
        private readonly AzonContext _context;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;
        public ShippingController(AzonContext context, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
        {

            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("getShipping")]
        public async Task<ActionResult<ServiceResponse<ShippingDetail>>> GetShipping([FromForm] string? guid)
        {
            var service = new ServiceResponse<ShippingDetail>();
            var nameIdentifier = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            ShippingDetail shipping = null;
            if (nameIdentifier == null)
            {
                if (guid != null)
                {
                    nameIdentifier = guid;
                }
            

            }
            shipping = await _context.ShippingDetails.Where(s => s.CustomerId == nameIdentifier).FirstOrDefaultAsync();
            if (shipping != null)
            {
                
                service.Success = true;
                service.Message = "Shipping retrieved";
                service.Data = shipping;

            }
            else
            {
                service.Success = false;
                service.Message = "No shipping found";
            }
            return service;

        }


        [HttpPost]
        public async Task<ActionResult<ServiceResponse<string>>> AddShipping(ShippingDetailDto shippingDetail)
        {
            var service = new ServiceResponse<string>();
            var nameIdentifier = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            ApplicationUser customer = null;
            ShippingDetail shipping = null; 
            if (nameIdentifier != null)
            {
                customer = await _context.Users.FirstOrDefaultAsync(u => u.Id == nameIdentifier);
            }
            else
            {
                if (shippingDetail.Guid != null)
                {
                    nameIdentifier = shippingDetail.Guid;
                    customer = await _context.Users.FirstOrDefaultAsync(u => u.Id == shippingDetail.Guid);
                }
               
            }
            shipping = await _context.ShippingDetails.Where(s => s.CustomerId == nameIdentifier).FirstOrDefaultAsync();


            if (shipping != null)
            {

                shipping.FirstName = shippingDetail.FirstName;
                shipping.LastName = shippingDetail.LastName;
                shipping.Address = shippingDetail.Address;
                shipping.Email = shippingDetail.Email;
                shipping.Mobile = shippingDetail.Mobile;
                shipping.City = shippingDetail.City;
                shipping.PostCode = shippingDetail.PostCode;
                shipping.Country = shippingDetail.Country;
                shipping.Info = shippingDetail.Info;
                await _context.SaveChangesAsync();
                service.Success = true;
                service.Message = "Updated";

            }
            else
            {

                ShippingDetail sd = new ShippingDetail
                {
                    FirstName = shippingDetail.FirstName,
                    LastName = shippingDetail.LastName,
                    Address = shippingDetail.Address,
                    Email = shippingDetail.Email,
                    City = shippingDetail.City,
                    PostCode = shippingDetail.PostCode,
                    CustomerId = nameIdentifier ,
                    Customer = customer,
                    Mobile = shippingDetail.Mobile

                };
                service.Success = true;
                service.Message = "Shipping Details Added";
                _context.ShippingDetails.Add(sd);
                await _context.SaveChangesAsync();

            }


            return service;

        }
    }
}
