using Azon.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClientShopping.Controllers
{
    public interface IWishListController
    {
        Task<ActionResult<ServiceResponse<Wishlist>>> AddItem(WishlistItemDto itemDto);
        Task<ActionResult<ServiceResponse<Wishlist>>> DeleteWishlistItem(int id,string? guid);
        Task<ActionResult<ServiceResponse<Wishlist>>> GetWishList(string guid);
    }
}