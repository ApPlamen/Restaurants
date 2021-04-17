using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Restaurant : BaseSoftDeleteDALModel<string>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string LegalId { get; set; }

        public Company Company { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
