

using Azon.Areas.Identity.Data;

namespace Azon.Models
{
    public interface IAuthentication
    {
        string GenerateJwtToken(ApplicationUser user, string role);
       /* string ValidateToken(string token);*/
    }
}