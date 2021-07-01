using System.Collections.Generic;

namespace DAL.Models
{
    public class Order : BaseDALModel<string>
    {
        public string RestaurantId { get; set; }

        public string TableNumber { get; set; }

        public virtual Restaurant Restaurant { get; set; }

        public virtual ICollection<UserOrder> UserOrders { get; set; } = new List<UserOrder>();

        public virtual ICollection<MenuItemOrder> MenuItemOrders { get; set; } = new List<MenuItemOrder>();
    }
}
