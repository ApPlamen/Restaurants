using DAL.InputModels;
using DAL.ViewModels;
using System.Collections.Generic;

namespace Services
{
    public interface IUserOrderService : IBaseService
    {
        string GetActiveOrder(string userId);

        IEnumerable<MenuItemBoardViewModel> GetMenu(string userId);

        void AddItemToOrder(MenuItemOrderInputModel item, string userId);

        IEnumerable<OrderedMenuItemBoardViewModel> GetOrderedItems(string userId);

        void HasActiveOrderCheck(string userId);
    }
}
