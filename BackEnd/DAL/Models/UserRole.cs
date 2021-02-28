using Microsoft.AspNetCore.Identity;

namespace DAL.Models
{
    public class UserRole : IdentityUserRole<string>
    {
        public virtual Role Role { get; set; }
    }
}
