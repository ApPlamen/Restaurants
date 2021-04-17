using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Company : BaseSoftDeleteDALModel<string>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string LegalId { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

        public virtual ICollection<Restaurant> Restaurants { get; set; } = new List<Restaurant>();
    }
}
