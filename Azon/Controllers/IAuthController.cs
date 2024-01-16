using Azon.Areas.Identity.Data;
using Azon.Models;
using Microsoft.AspNetCore.Mvc;

namespace Azon.Controllers
{
    public interface IAuthController
    {
        Task<ActionResult<ServiceResponse<IEnumerable<ApplicationUser>>>> ChangeUserRole([FromForm] string email);
        Task<ActionResult<ServiceResponse<IEnumerable<ApplicationUser>>>> DeleteUser([FromForm] string email);
        Task<ActionResult<ServiceResponse<ApplicationUser>>> GetInfo();
        Task<ActionResult<ServiceResponse<ApplicationUser>>> GetUserInfoById(string id);
        Task<ActionResult<ServiceResponse<IEnumerable<ApplicationUser>>>> GetUsersWithRoles();
        Task<ActionResult<ServiceResponse<string>>> Login([FromBody] Login login);
        Task<ActionResult<ServiceResponse<string>>> Register(Register register);
        Task<ActionResult<ServiceResponse<ApplicationUser>>> UpdateInfo(Register userdto);
    }
}