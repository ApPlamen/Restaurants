using System.Collections.Generic;

namespace DAL.Models.Completed
{
    public class CompletedOrder
    {
        public string Id { get; set; }

        public string RestaurantId { get; set; }

        public string TableNumber { get; set; }

        public virtual ICollection<CompletedOrderedItem> ItemOrdered { get; set; } = new List<CompletedOrderedItem>();
    }
}
