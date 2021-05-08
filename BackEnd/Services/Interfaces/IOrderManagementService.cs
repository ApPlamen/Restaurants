using DAL.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface IOrderManagementService : IBaseService
    {
        IEnumerable<OrderManagementBoardViewModel> GetRestaurantOrders(string restaurantId);

        IEnumerable<OrderedMenuItemManagementBoardViewModel> GetOrderedMenuItems(string restaurantId);

        void CloseOrder(string orderId, string userId);

        Task<bool> CanActivate(string userId, string restaurantId);
    }
}
