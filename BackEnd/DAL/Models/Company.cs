using System.Collections.Generic;

namespace DAL.Models
{
    public class Company : BaseSoftDeleteDALModel<string>
    {
        public string Name { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

        public virtual ICollection<Restaurant> Restaurants { get; set; } = new List<Restaurant>();
    }
}
