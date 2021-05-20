using Enums;
using System;

namespace DAL.Models
{
    public class MenuItemOrder : BaseDALModel<int>
    {
        public string OrderId { get; set; }

        public string MenuItemPriceId { get; set; }

        public string UserId { get; set; }

        public DateTime DateTime { get; set; } = DateTime.UtcNow;

        public OrderedItemStatuses OrderedItemStatus { get; set; }

        public virtual Order Order { get; set; }

        public virtual MenuItemPrice MenuItemPrice { get; set; }

        public virtual User User { get; set; }
    }
}
