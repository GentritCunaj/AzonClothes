using Azon.Areas.Identity.Data;
using Azon.Data;
using Azon.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System.Diagnostics.Metrics;
using System.Security.Claims;

namespace Azon.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase, IAuthController
    {
        private readonly AzonContext _db;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthentication _authentication;
        private readonly IHttpContextAccessor _context;

        public AuthController(AzonContext db, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager,
            IAuthentication authentication, IHttpContextAccessor context, RoleManager<IdentityRole> roleManager)
        {
            _db = db;
            _signInManager = signInManager;
            _userManager = userManager;
            _authentication = authentication;
            _context = context;
            _roleManager = roleManager;
        }

        [HttpGet("allUsers")]
        public async Task<ActionResult<ServiceResponse<IEnumerable<ApplicationUser>>>> GetUsersWithRoles()
        {
            var response = new ServiceResponse<IEnumerable<ApplicationUser>>();
            var users = await _userManager.Users.ToListAsync();

            foreach (var user in users)
            {
                user.Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
            }

            response.Data = users;
            response.Message = "Users retrieved";
            response.Success = true;
            return response;
        }

        [HttpGet("userInfo/{id}")]
        public async Task<ActionResult<ServiceResponse<ApplicationUser>>> GetUserInfoById(string id)
        {
            var response = new ServiceResponse<ApplicationUser>();
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {

                response.Success = false;
                response.Message = "User doesnt exist";
            }
            else
            {
                user.Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
            }
            response.Data = user;
            response.Success = true;
            response.Message = "User retrieved";
            return response;

        }


        [HttpPost("userRole")]
        public async Task<ActionResult<ServiceResponse<IEnumerable<ApplicationUser>>>> ChangeUserRole([FromForm] string email)
        {
            var response = new ServiceResponse<IEnumerable<ApplicationUser>>();
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var currentRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, currentRoles);
            var newRole = "";
            if (currentRoles[0] == "Admin")
            {
                newRole = "Customer";
            }
            else
            {
                newRole = "Admin";
            }

            // Add the user to the new role
            await _userManager.AddToRoleAsync(user, newRole);

            // Update the user's role property (optional)
            user.Role = newRole;
            await _userManager.UpdateAsync(user);
            var users = await _userManager.Users.ToListAsync();

            foreach (var u in users)
            {
                u.Role = (await _userManager.GetRolesAsync(u)).FirstOrDefault();
            }

            response.Data = users;
            response.Success = true;
            response.Message = "User updated";
            return response;
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<IEnumerable<ApplicationUser>>>> DeleteUser([FromForm] string email)
        {
            var response = new ServiceResponse<IEnumerable<ApplicationUser>>();
            var user = await _userManager.FindByEmailAsync(email);
            var users = await _userManager.Users.ToListAsync();

            foreach (var u in users)
            {
                u.Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
            }

            if (user == null)
            {

                response.Data = users;
                response.Success = false;
                response.Message = "User doesnt exist";

            }

            var result = await _userManager.DeleteAsync(user);

            if (result.Succeeded)
            {
                users.Remove(user);
                response.Data = users;
                response.Success = true;
                response.Message = "User deleted";

            }
            else
            {
                response.Data = users;
                response.Success = false;
                response.Message = "Something went wrong";

            }
            return response;
        }



        [HttpPut("info")]
        public async Task<ActionResult<ServiceResponse<ApplicationUser>>> UpdateInfo(Register userdto)
        {
            var response = new ServiceResponse<ApplicationUser>();
            var nameIdentifier = _context.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(nameIdentifier);
            if (user != null)
            {
                user.FirstName = userdto.FirstName;
                user.LastName = userdto.LastName;
                user.PhoneNumber = userdto.PhoneNumber;
                user.Email = userdto.Email;
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, userdto.Password);
                user.UserName = userdto.UserName;
                user.Birthday = userdto.Birthday;
                user.City = userdto.City;
                user.Country = userdto.Country;
                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    response.Data = user;
                    response.Success = true;
                    response.Message = "User updated";
                }
                else
                {
                    response.Data = user;
                    response.Success = false;
                    response.Message = "Something went wrong";
                }


            }
            else
            {
                response.Data = null;
                response.Success = false;
                response.Message = "No user found";

            }
            return response;

        }


        [HttpGet("info")]
        public async Task<ActionResult<ServiceResponse<ApplicationUser>>> GetInfo()
        {
            var response = new ServiceResponse<ApplicationUser>();
            var nameIdentifier = _context.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var user = await _db.Users.Where(u => u.Id == nameIdentifier).FirstOrDefaultAsync();
            if (user == null)
            {
                response.Data = null;
                response.Message = "No user found";
                response.Success = false;
            }
            else
            {
                response.Data = user;
                response.Message = "User found";
                response.Success = true;
            }
            return response;

        }



        [HttpPost("loginCustomer")]
        public async Task<ActionResult<ServiceResponse<string>>> Login([FromBody] Login login)
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
                    var userRoles = await _userManager.GetRolesAsync(user);
                    var jwtSecurityToken = _authentication.GenerateJwtToken(user, userRoles[0]);

                    _context.HttpContext.Session.SetString("user", user.NormalizedEmail);

                    _context.HttpContext.Session.SetString("Token", jwtSecurityToken);
                    if (userRoles[0] == "Admin")
                    {
                        response.Data = jwtSecurityToken;
                        response.Message = "Admin Logged in";
                        response.Success = true;
                    }
                    if (userRoles[0] == "Customer")
                    {
                        response.Data = jwtSecurityToken;
                        response.Message = "Customer Logged in";
                        response.Success = true;
                    }

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
                return response;
            }

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

            if (result.Succeeded)
            {
                // User creation succeeded, now add the role
                var addToRoleResult = await _userManager.AddToRoleAsync(user, "Customer");

                if (addToRoleResult.Succeeded)
                {
                    response.Data = null;
                    response.Success = true;
                    response.Message = "You're registered";
                }
                else
                {
                    // If adding the role fails, delete the user and return an error response
                    await _userManager.DeleteAsync(user);
                    response.Data = null;
                    response.Success = false;
                    response.Message = "Failed to add role to the user";
                }
            }
            else
            {
                response.Data = null;
                response.Success = false;
                response.Message = "Failed to create user";
            }

            return response;
        }

    }
}
