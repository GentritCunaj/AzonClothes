using System.ComponentModel.DataAnnotations;

namespace Azon.Models
{
    public class Register
    {
        public string  FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }

        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string PhoneNumber { get; set; }

       
        public string City { get; set; }
        
        public string Country { get; set; }
     
        public DateTime Birthday { get; set; }

        /* public string PasswordConfirmed { get; set; }*/
    }
}
