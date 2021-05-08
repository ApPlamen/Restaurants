using System;

namespace DAL.ViewModels
{
    public class OrderedMenuItemManagementBoardViewModel
    {
        public int Id { get; set; }

        public string TableNumber { get; set; }

        public string MenuItem { get; set; }

        public string Option { get; set; }

        public DateTime DateTime { get; set; }
    }
}
