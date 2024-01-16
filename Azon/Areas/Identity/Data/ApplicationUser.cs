using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Azon.Areas.Identity.Data
{
    public class ApplicationUser:IdentityUser
    {
        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string? FirstName { get; set; }

        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string? LastName { get; set; }

        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string? City { get; set; }

        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string? Country { get; set; }

        [PersonalData]
        public DateTime? Birthday { get; set; }

        [NotMapped]
        public string? Role { get; set; }
    }
}
