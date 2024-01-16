using Azon.Areas.Identity.Data;
using Azon.Data;
using Azon.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using ShoppingEcommerce.Models;
using System;
using System.Security.Claims;

namespace ClientShopping.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WishListController : ControllerBase, IWishListController
    {
        private readonly AzonContext _context;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;
        public WishListController(AzonContext context, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
        {

            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<Wishlist>>> DeleteWishlistItem(int id, [FromQuery] string? guid)
        {
            var service = new ServiceResponse<Wishlist>();
            var nameIdentifier = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var wishlistItem = await _context.WishlistItems.FirstOrDefaultAsync(c => c.WishlistItemId == id);
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == wishlistItem.ProductId);
            if (nameIdentifier == null)
            {
                if (guid != null)
                {
                    nameIdentifier = guid;
                }
            }
            if (wishlistItem == null)
            {

                service.Success = false;
                service.Message = "WishlistItem doenst exist";
                service.Data = await _context.Wishlists.Include(i => i.Items).ThenInclude(item => item.Product).ThenInclude(p => p.ColorVariants).ThenInclude(p => p.StockOptions).Where(c => c.isCompleted == false).Where(w => w.CustomerId == nameIdentifier).FirstOrDefaultAsync();

            }
            else
            {
                _context.WishlistItems.Remove(wishlistItem);
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                service.Success = true;
                service.Message = "WishlistItem deleted";
                service.Data = await _context.Wishlists.Include(i => i.Items).ThenInclude(item => item.Product).ThenInclude(p => p.ColorVariants).ThenInclude(p => p.StockOptions).Where(c => c.isCompleted == false).Where(w => w.CustomerId == nameIdentifier).FirstOrDefaultAsync();
            }
            return service;
        }

        [HttpPost("getWishlist")]
        public async Task<ActionResult<ServiceResponse<Wishlist>>> GetWishList([FromForm] string? guid)
        {
            var service = new ServiceResponse<Wishlist>();
            var nameIdentifier = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(nameIdentifier))
            {
                // User is not logged in
                // Retrieve the GUID from session or any other persistent storage

                nameIdentifier = guid;
                if (string.IsNullOrEmpty(guid))
                {
                    // If the GUID is not found, return a response indicating that the user has no wishlist
                    service.Success = false;
                    service.Message = "No Wishlist";
                    service.Data = null;
                    return service;
                }
            }

            var wishlist = await _context.Wishlists.Include(i => i.Items).ThenInclude(item => item.Product).Where(c => c.isCompleted == false).Where(w => w.CustomerId == nameIdentifier).FirstOrDefaultAsync();
            if (wishlist == null)
            {
                service.Success = false;
                service.Message = "No Wishlist";
                service.Data = null;
            }
            else
            {
                service.Success = true;
                service.Message = "Wishlist retrieved";
                service.Data = await _context.Wishlists.Include(i => i.Items).ThenInclude(item => item.Product).ThenInclude(p => p.ColorVariants).ThenInclude(p => p.StockOptions).Where(c => c.isCompleted == false).Where(w => w.CustomerId == nameIdentifier).FirstOrDefaultAsync();
            }

            return service;
        }


        [HttpPost]
        public async Task<ActionResult<ServiceResponse<Wishlist>>> AddItem(WishlistItemDto itemDto)
        {
            var service = new ServiceResponse<Wishlist>();

            Product product = await _context.Products.FirstOrDefaultAsync(c => c.ProductId == itemDto.ProductId);

            Product ogProduct = await _context.Products.FirstOrDefaultAsync(c => c.ProductId == itemDto.OriginalProductId);

            var nameIdentifier = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser customer = null;
            ApplicationUser userNotLoggedIn = null;
            string temporaryIdentifier = itemDto.Guid ?? null;
            if (nameIdentifier != null)
            {
                
                customer = await _context.Users.FirstOrDefaultAsync(u => u.Id == nameIdentifier);
            }
            else
            {
                if (itemDto.Guid != null )
                {
                    userNotLoggedIn = await _context.Users.FirstOrDefaultAsync(u => u.Id == itemDto.Guid);

                }
                else
                {

                    temporaryIdentifier = Guid.NewGuid().ToString();
                    userNotLoggedIn = new ApplicationUser { Id = temporaryIdentifier };
                }
                


                // Create a new user with a temporary identifier

            }

            if (product == null)
            {

                service.Success = true;
                service.Message = "Wishlist added";

                service.Data = null;
            }
            else
            {
                if (nameIdentifier != null)
                {


                    var existingWishlist = _context.Wishlists.Where(w => w.isCompleted == false).FirstOrDefault(w => w.CustomerId == nameIdentifier);

                    if (existingWishlist == null)
                    {
                        // If no wishlist exists, create a new wishlist for the user
                        existingWishlist = new Wishlist { CustomerId = nameIdentifier, Customer = customer };
                        _context.Wishlists.Add(existingWishlist);
                    }

                    // Add the wishlist item to the wishlist
                    var existingItem = await _context.WishlistItems.Where(w => w.Wishlist.isCompleted == false)
                    .FirstOrDefaultAsync(item =>
                        item.CustomerId == nameIdentifier &&
                        item.ProductId == itemDto.ProductId);

                    if (existingItem != null)
                    {
                        // Item already exists, update the count or perform any other logic
                        existingItem.Count = itemDto.Count;
                        await _context.SaveChangesAsync();
                        service.Success = true;
                        service.Message = "Item added";
                        service.Data = await _context.Wishlists.Where(c => c.isCompleted == false).Include(i => i.Items).ThenInclude(item => item.Product).ThenInclude(p => p.ColorVariants).ThenInclude(p => p.StockOptions).Where(c => c.isCompleted == false).Where(w => w.CustomerId == nameIdentifier).FirstOrDefaultAsync();
                    }
                    else
                    {


                        WishlistItem item = new WishlistItem
                        {
                            CustomerId = nameIdentifier,
                            ProductId = itemDto.ProductId,
                            Count = itemDto.Count,
                            DateAdded = DateTime.UtcNow,
                            Customer = customer,
                            Product = product,
                            OriginalProductId = itemDto.OriginalProductId,
                            OriginalProduct = ogProduct


                        };
                        _context.WishlistItems.Add(item);
                        existingWishlist.Items.Add(item);
                        await _context.SaveChangesAsync();
                        service.Success = true;
                        service.Message = "Wishlist added";
                        service.Data = await _context.Wishlists.Include(i => i.Items).ThenInclude(item => item.Product).ThenInclude(p => p.ColorVariants).ThenInclude(p => p.StockOptions).Where(c => c.isCompleted == false).Where(w => w.CustomerId == nameIdentifier).FirstOrDefaultAsync();
                    }
                }
                else
                {
                    var existingWishlist = _context.Wishlists
                .Where(w => w.isCompleted == false)
                .FirstOrDefault(w => w.CustomerId == userNotLoggedIn.Id);

                    if (existingWishlist == null)
                    {
                        // If no wishlist exists, create a new wishlist for the user
                        existingWishlist = new Wishlist { CustomerId = userNotLoggedIn.Id, Customer = userNotLoggedIn };
                        _context.Wishlists.Add(existingWishlist);
                    }

                    // Add the wishlist item to the wishlist
                    var existingItem = await _context.WishlistItems
                        .Where(w => w.Wishlist.isCompleted == false)
                        .FirstOrDefaultAsync(item =>
                            item.CustomerId == userNotLoggedIn.Id &&
                            item.ProductId == itemDto.ProductId);

                    if (existingItem != null)
                    {
                        // Item already exists, update the count or perform any other logic
                        existingItem.Count = itemDto.Count;
                        await _context.SaveChangesAsync();
                        service.Success = true;
                        service.Message = "Item added";
                        service.Guid = temporaryIdentifier;
                        service.Data = await _context.Wishlists
                            .Where(c => c.isCompleted == false)
                            .Include(i => i.Items)
                            .ThenInclude(item => item.Product)
                            .ThenInclude(p => p.ColorVariants)
                            .ThenInclude(p => p.StockOptions)
                            .Where(c => c.isCompleted == false)
                            .Where(w => w.CustomerId == userNotLoggedIn.Id)

                            .FirstOrDefaultAsync();
                    }
                    else
                    {
                        // Create a new wishlist item for the anonymous user
                        WishlistItem item = new WishlistItem
                        {
                            CustomerId = userNotLoggedIn.Id,
                            ProductId = itemDto.ProductId,
                            Count = itemDto.Count,
                            DateAdded = DateTime.UtcNow,
                            Customer = userNotLoggedIn,
                            Product = product,
                            OriginalProductId = itemDto.OriginalProductId,
                            OriginalProduct = ogProduct
                        };
                        _context.WishlistItems.Add(item);
                        existingWishlist.Items.Add(item);
                        await _context.SaveChangesAsync();
                        service.Success = true;
                        service.Message = "Wishlist added";
                        service.Guid = temporaryIdentifier;
                        service.Data = await _context.Wishlists
                            .Include(i => i.Items)
                            .ThenInclude(item => item.Product)
                            .ThenInclude(p => p.ColorVariants)
                            .ThenInclude(p => p.StockOptions)
                            .Where(c => c.isCompleted == false)
                            .Where(w => w.CustomerId == userNotLoggedIn.Id)
                            .FirstOrDefaultAsync();
                    }
                }
            }
            return service;

        }


    }


}
