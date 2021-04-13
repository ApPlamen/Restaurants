﻿using System.Collections.Generic;

namespace DAL.Models
{
    public class Restaurant : BaseSoftDeleteDALModel<string>
    {
        public string Name { get; set; }

        public Company Company { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
