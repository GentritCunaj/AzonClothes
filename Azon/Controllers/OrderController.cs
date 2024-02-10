using Azon.Areas.Identity.Data;
using Azon.Data;
using Azon.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ClientShopping.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase, IOrderController
    {
        private readonly AzonContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;

        public OrderController(AzonContext context, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("updateStatus")]
        public async Task<ActionResult<ServiceResponse<Order>>> UpdateStatusOrder(StatusDto statusDto)
        {
            var service = new ServiceResponse<Order>();

            var order = _context.Orders.Where(o => o.OrderId == statusDto.OrderId).Include(o => o.Shipping).Include(o => o.Wishlist).ThenInclude(w => w.Items).ThenInclude(w => w.Product).FirstOrDefault();
            if (order != null)
            {
                if (Enum.TryParse<Order.OrderStatusEnum>(statusDto.OrderStatusName, out var orderStatus))
                {
                    order.OrderStatus = orderStatus;
                }
                else
                {
                    return BadRequest("Invalid OrderStatusName");
                }

                // Update other properties based on the StatusDto
                order.DeliveredDate = statusDto.DeliveredDate;
                order.ShippedDate = statusDto.ShippedDate;
                await _context.SaveChangesAsync();
                service.Success = true;
                service.Message = "Order updated";
                service.Data = order;
            }
            else
            {
                service.Success = false;
                service.Message = "Order doesnt exist";
                service.Data = order;
            }
            return service;

        }

        [Authorize(Roles = "Admin,Customer")]

        [HttpPost("cancel")]
        public async Task<ActionResult<ServiceResponse<Order>>> CancelOrder(id id)
        {
            var service = new ServiceResponse<Order>();

            var order = _context.Orders.Where(o => o.OrderId == id.Id).Include(o => o.Shipping).Include(o => o.Wishlist).ThenInclude(w => w.Items).ThenInclude(w => w.Product).FirstOrDefault();

            if (order.OrderStatus == Order.OrderStatusEnum.Processing || order.OrderStatus == Order.OrderStatusEnum.Pending)
            {

                order.OrderStatus = Order.OrderStatusEnum.Cancelled;
                order.OrderStatusName = "Cancelled";
                await _context.SaveChangesAsync();
                service.Success = true;
                service.Message = "Order retrieved";
                service.Data = order;

            }
            else
            {
                service.Success = false;
                service.Message = "Order cannot be cancelled";
                service.Data = order;

            }
            return service;
        }





        [Authorize(Roles = "Admin,Customer")]

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Order>>> GetSingleOrder(int id)
        {
            var service = new ServiceResponse<Order>();
            var order = _context.Orders.Where(o => o.OrderId == id).Include(o => o.Customer).Include(o => o.Shipping).Include(o => o.Wishlist).ThenInclude(w => w.Items).ThenInclude(w => w.Product).ThenInclude(w => w.ColorVariants).ThenInclude(w => w.StockOptions).FirstOrDefault();
            if (order != null)
            {
                order.OrderStatusName = OrderStatusMapper.MapOrderStatusToString(order.OrderStatus);
                service.Success = true;
                service.Message = "Order retrieved";
                service.Data = order;
            }
            else
            {
                service.Success = false;
                service.Message = "Order doesnt exist";
                service.Data = null;
            }
            return service;


        }
        [Authorize(Roles = "Admin")]

        [HttpGet("allOrders")]
        public async Task<ActionResult<ServiceResponse<List<Order>>>> GetAllOrders()
        {
            var service = new ServiceResponse<List<Order>>();

            var orders = await _context.Orders.Include(c => c.Customer).Include(o => o.Wishlist).ThenInclude(w => w.Items).ThenInclude(p => p.Product).ThenInclude(p => p.ColorVariants).ToListAsync();

            if (orders != null)
            {
                foreach (var order in orders)
                {
                    order.OrderStatusName = OrderStatusMapper.MapOrderStatusToString(order.OrderStatus);
                }
                service.Success = true;
                service.Message = "Orders retrieved successfully";
                service.Data = orders;
            }
            else
            {

                service.Success = true;
                service.Message = "No orders yet";
                service.Data = null;
            }
            return service;
        }


        [Authorize(Roles = "Admin,Customer")]

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<Order>>>> GetOrders()
        {
            var service = new ServiceResponse<List<Order>>();
            var nameIdentifier = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var orders = await _context.Orders.Include(c => c.Customer).Include(o => o.Wishlist).ThenInclude(w => w.Items).ThenInclude(p => p.Product).ThenInclude(p => p.ColorVariants).ThenInclude(p => p.StockOptions).Where(o => o.CustomerId == nameIdentifier).ToListAsync();

            if (orders != null)
            {
                foreach (var order in orders)
                {
                    order.OrderStatusName = OrderStatusMapper.MapOrderStatusToString(order.OrderStatus);
                }
                service.Success = true;
                service.Message = "Orders retrieved successfully";
                service.Data = orders;
            }
            else
            {

                service.Success = true;
                service.Message = "No orders yet";
                service.Data = null;
            }
            return service;
        }

    }
}
