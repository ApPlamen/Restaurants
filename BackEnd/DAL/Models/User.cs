using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace DAL.Models
{
    public class User : IdentityUser<string>, BaseDALModel<string>
    {
        public string Fullname { get; set; }

        public virtual ICollection<UserRole> Roles { get; set; } = new List<UserRole>();
    }
}
