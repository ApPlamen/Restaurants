using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace DAL.Models
{
    public class User : IdentityUser<string>, IBaseSoftDeleteDALModel<string>
    {
        public string Fullname { get; set; }

        public UserOrder UserOrder { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

        public virtual ICollection<MenuItemOrder> MenuItemOrders { get; set; } = new List<MenuItemOrder>();

        public bool IsActive { get; set; } = true;
    }
}
