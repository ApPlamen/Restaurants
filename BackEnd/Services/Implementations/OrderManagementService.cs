﻿using AutoMapper;
using DAL.Models;
using DAL.Repository;
using DAL.ViewModels;
using Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public class OrderManagementService : BaseService<Order>, IOrderManagementService
    {
        private readonly IRepository<Restaurant> restaurant;

        public OrderManagementService(IMapper mapper,
            IRepository<Order> order,
            IRepository<Restaurant> restaurant,
            UserManager<User> userManager)
            : base(mapper, order, userManager)
        {
            this.restaurant = restaurant;
        }

        public IEnumerable<OrderManagementBoardViewModel> GetRestaurantOrders(string restaurantId)
        {
            var result = this.repo.All()
                .Where(o => o.RestaurantId.Equals(restaurantId))
                .Select(o => new OrderManagementBoardViewModel()
                {
                    Id = o.Id,
                    TableNumber = o.TableNumber,
                    Bill = o.MenuItemOrders
                        .Sum(io => io.MenuItemPrice.Price)
                        .ToString(),
                    CanClose = o.MenuItemOrders
                        .All(io => io.OrderedItemStatus == OrderedItemStatusesEnum.Served
                            || io.OrderedItemStatus == OrderedItemStatusesEnum.Removed),
                })
                .ToList();

            return result;
        }

        public IEnumerable<OrderedMenuItemManagementBoardViewModel> GetOrderedMenuItems(string restaurantId)
        {
            var result = this.repo.All()
                .Where(o => o.RestaurantId.Equals(restaurantId))
                .SelectMany(o => o.MenuItemOrders)
                .Where(m => (int)m.OrderedItemStatus != (int)OrderedItemStatusesEnum.Served
                    && (int)m.OrderedItemStatus != (int)OrderedItemStatusesEnum.Removed)
                .Select(oi => new OrderedMenuItemManagementBoardViewModel()
                {
                    Id = oi.Id,
                    TableNumber = oi.Order.TableNumber,
                    MenuItem = oi.MenuItemPrice.MenuItem.Name,
                    Option = oi.MenuItemPrice.Type,
                    OrderedItemStatus = (int)oi.OrderedItemStatus,
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

        public async Task<bool> CanActivate(string userId, string restaurantId)
        {
            var user = await userManager.Users
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == userId);

            var result = this.restaurant.All()
                .Where(r => r.Id.Equals(restaurantId) && r.IsActive)
                .Where(Filters.RestaurantsFilterByUser(user))
                .Any();

            return result;
        }
    }
}
