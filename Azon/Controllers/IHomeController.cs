using Microsoft.AspNetCore.Mvc;

namespace Azon.Controllers
{
    public interface IHomeController
    {
        Task<IActionResult> UploadImageAsync(IFormFile image);
    }
}