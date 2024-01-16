using Azon.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClientShopping.Controllers
{
    public interface IOrderController
    {
        Task<ActionResult<ServiceResponse<Order>>> CancelOrder(id id);
        Task<ActionResult<ServiceResponse<List<Order>>>> GetAllOrders();
        Task<ActionResult<ServiceResponse<List<Order>>>> GetOrders();
        Task<ActionResult<ServiceResponse<Order>>> GetSingleOrder(int id);
        Task<ActionResult<ServiceResponse<Order>>> UpdateStatusOrder(StatusDto statusDto);
    }
}