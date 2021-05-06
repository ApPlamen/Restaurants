using DAL.InputModels;
using DAL.ViewModels;
using System.Collections.Generic;

namespace Services
{
    public interface IOrderService : IBaseService
    {
        string StartOrder(OrderDetailsInputModel orderDetails, string userId);

        void JionOrder(string orderId, string userId);

        string GetActiveOrder(string userId);

        IEnumerable<MenuItemBoardViewModel> GetMenu(string userId);

        void AddItemToOrder(MenuItemOrderInputModel item, string userId);

        IEnumerable<OrderedMenuItemBoardViewModel> GetOrderedItems(string userId);

        //TO BE MOVED
        void CloseOrder(string orderId, string userId);
    }
}
