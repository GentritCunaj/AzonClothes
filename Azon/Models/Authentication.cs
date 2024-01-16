using Azon.Areas.Identity.Data;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using ShoppingEcommerce.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Azon.Models
{

    public class Authentication : IAuthentication
    {
        private IConfiguration _config;
        public Authentication(IConfiguration config)
        {
            _config = config;
        }
        public string GenerateJwtToken(ApplicationUser user, string role)
        {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.FirstName),
                new Claim(ClaimTypes.GivenName, user.LastName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, role)};

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Convert.ToString("YourSecretKeyForAuthenticationOfApplication")));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(Convert.ToString("30")));
            var token = new JwtSecurityToken(
                Convert.ToString("localhost:7247"),
                Convert.ToString("localhost:3000"), claims, expires: expires, signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
