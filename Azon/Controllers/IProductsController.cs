using Azon.Models;
using Microsoft.AspNetCore.Mvc;

namespace Azon.Controllers
{
    public interface IProductsController
    {
        Task<ActionResult<ServiceResponse<Product?>>> DeleteCV(int id);
        Task<ActionResult<ServiceResponse<List<Product>>>> DeleteProduct(int id);
        Task<ActionResult<ServiceResponse<List<Product>>>> GetAllProducts();
        Task<ActionResult<ServiceResponse<List<Product>>>> GetProducts();
        Task<ActionResult<ServiceResponse<Product>>> GetSingleProduct(int id);
        Task<ActionResult<ServiceResponse<Product>>> PostProduct(productDto productdto);
        Task<ActionResult<ServiceResponse<Product>>> PutProduct(int id, [FromForm] ProductEditDto productUpdated);
    }
}