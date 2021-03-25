using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace DAL.Models
{
    public class UserRole : IdentityUserRole<string>
    {
        public virtual Role Role { get; set; }

        public virtual ICollection<Restaurant> Restaurants { get; set; }

        public virtual ICollection<Company> Companies { get; set; }
    }
}
