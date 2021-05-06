using DAL.ViewModels;
using System.Collections.Generic;

namespace Services
{
    public interface IOrderManagementService : IBaseService
    {
        IEnumerable<OrderManagementBoardViewModel> GetRestaurantOrders(string restaurantId);

        IEnumerable<OrderedMenuItemManagementBoardViewModel> GetOrderedMenuItems(string restaurantId);

        void CloseOrder(string orderId, string userId);
    }
}
