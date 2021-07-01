using System.Collections.Generic;

namespace DAL.Models
{
    public class MenuItemPrice : BaseSoftDeleteDALModel<string>
    {
        public string Type { get; set; }

        public decimal Price { get; set; }

        public string MenuItemId { get; set; }

        public virtual MenuItem MenuItem { get; set; }

        public virtual ICollection<MenuItemOrder> MenuItemOrders { get; set; } = new List<MenuItemOrder>();
    }
}
