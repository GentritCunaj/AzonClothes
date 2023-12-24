using Azon.Areas.Identity.Data;
using Azon.Data;
using Azon.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Win32;


namespace Azon.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AzonContext _db;
        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthentication _authentication;
        private readonly IHttpContextAccessor _context;

        public AuthController(AzonContext db, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager,
            IAuthentication authentication, IHttpContextAccessor context)
        {
            _db = db;
            _signInManager = signInManager;
            _userManager = userManager;
            _authentication = authentication;
            _context = context;
        }


        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<string>>> Login(Login login)
        {

            var response = new ServiceResponse<string>();
            var user = await _userManager.FindByEmailAsync(login.email);
            if (user == null)
            {
                response.Data = null;
                response.Success = false;
                response.Message = "No user found";
            }
            else
            {


                var result = await _signInManager.PasswordSignInAsync(user, login.password, false, false);
                if (result.Succeeded)
                {
                    var jwtSecurityToken = _authentication.GenerateJwtToken(user, "Customer");

                    _context.HttpContext.Session.SetString("user", user.NormalizedEmail);

                    _context.HttpContext.Session.SetString("Token", jwtSecurityToken);
                    response.Data = jwtSecurityToken;
                    response.Message = "Logged in";
                    response.Success = true;
                }
                else
                {
                    response.Data = null;
                    response.Message = "Not Logged in";
                    response.Success = false;
                }
            }
            return response;

        }
        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<string>>> Register(Register register)
        {

            var response = new ServiceResponse<string>();
            var checking = await _userManager.FindByEmailAsync(register.Email);
            if (checking != null)
            {
                response.Data = null;
                response.Success = false;
                response.Message = "You're already registered";
            }
            else
            {
                var user = new ApplicationUser
                {
                    FirstName = register.FirstName,
                    LastName = register.LastName,
                    Email = register.Email,
                    PhoneNumber = register.PhoneNumber,
                    UserName = register.UserName,
                    Birthday = register.Birthday,
                    City = register.City,
                    Country = register.Country,


                };
                var result = await _userManager.CreateAsync(user, register.Password);
                await _userManager.AddToRoleAsync(user, "Customer");
                if (result.Succeeded)
                {
                    response.Data = null;
                    response.Success = true;
                    response.Message = "You're registered";
                }
                else
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = "We don't know the specific problem";
                }
            }
            return response;
        }

    }
}
