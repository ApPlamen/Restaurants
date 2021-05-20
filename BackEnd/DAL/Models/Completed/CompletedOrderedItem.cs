using System;

namespace DAL.Models.Completed
{
    public class CompletedOrderedItem
    {
        public string Id { get; set; }

        public string OrderId { get; set; }

        public string MenuItemPriceId { get; set; }

        public string UserId { get; set; }

        public DateTime DateTime { get; set; }

        public decimal Price { get; set; }

        public virtual CompletedOrder Order { get; set; }
    }
}
