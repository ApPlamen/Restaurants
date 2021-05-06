using AutoMapper;
using DAL.Models;
using DAL.Repository;
using DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;

namespace Services
{
    public class OrderManagementService : BaseService<Order>, IOrderManagementService
    {
        public OrderManagementService(IMapper mapper,
            IRepository<Order> DALModel,
            UserManager<User> userManager)
            : base(mapper, DALModel, userManager)
        { }

        public IEnumerable<OrderManagementBoardViewModel> GetRestaurantOrders(string restaurantId)
        {
            var result = this.repo.All()
                .Where(o => o.RestaurantId.Equals(restaurantId))
                .Select(o => new OrderManagementBoardViewModel()
                {
                    Id = o.Id,
                    TableNumber = o.TableNumber,
                })
                .ToList();

            return result;
        }

        public IEnumerable<OrderedMenuItemManagementBoardViewModel> GetOrderedMenuItems(string restaurantId)
        {
            var result = this.repo.All()
                .Where(o => o.RestaurantId.Equals(restaurantId))
                .SelectMany(o => o.MenuItemOrders)
                .Select(oi => new OrderedMenuItemManagementBoardViewModel()
                {
                    Id = oi.Id,
                    TableNumber = oi.Order.TableNumber,
                    Option = oi.MenuItemPrice.Type,
                    DateTime = oi.DateTime,
                })
                .OrderByDescending(oi => oi.DateTime)
                .ToList();

            return result;
        }

        public void CloseOrder(string orderId, string userId)
        {
            var order = this.repo.GetById(orderId);

            this.repo.Delete(order);

            this.repo.Save();
        }
    }
}
