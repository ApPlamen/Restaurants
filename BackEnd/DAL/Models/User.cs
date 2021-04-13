using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace DAL.Models
{
    public class User : IdentityUser<string>, IBaseSoftDeleteDALModel<string>
    {
        public string Fullname { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

        public bool IsActive { get; set; }
    }
}
