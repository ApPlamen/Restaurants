using System;

namespace DAL.ViewModels
{
    public class OrderedMenuItemBoardViewModel
    {
        public int Id { get; set; }

        public string ItemName { get; set; }

        public string Option { get; set; }

        public string Price { get; set; }

        public string OrderedItemStatus { get; set; }

        public string UserName { get; set; }

        public DateTime DateTime { get; set; }

        public bool CanAskRemove { get; set; }
    }
}
