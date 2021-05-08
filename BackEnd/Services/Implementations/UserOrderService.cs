using AutoMapper;
using DAL.InputModels;
using DAL.Models;
using DAL.Repository;
using DAL.ViewModels;
using Exceptions;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Services
{
    public class UserOrderService : BaseService<UserOrder>, IUserOrderService
    {
        public UserOrderService(IMapper mapper,
            IRepository<UserOrder> userOrder,
            UserManager<User> userManager)
            : base(mapper, userOrder, userManager)
        { }

        public string GetActiveOrder(string userId)
        {
            var result = this.repo.All()
                .Where(uo => uo.UserId.Equals(userId))
                .Select(uo => uo.OrderId)
                .SingleOrDefault();

            return result;
        }

        public IEnumerable<MenuItemBoardViewModel> GetMenu(string userId)
        {
            var result = this.repo.All()
                .Where(uo => uo.UserId.Equals(userId))
                .SelectMany(uo => uo.Order.Restaurant.MenuItems)
                .Where(mi => mi.IsActive && mi.IsAvailable
                    && mi.MenuItemPrices
                        .Where(mp => mp.IsActive)
                        .Count() > 0)
                .Select(m => new MenuItemBoardViewModel()
                {
                    Id = m.Id,
                    Name = m.Name,
                    StartPrice = m.MenuItemPrices
                        .Where(mp => mp.IsActive)
                        .Min(mp => mp.Price)
                        .ToString(),
                })
                .ToList();

            return result;
        }

        public void AddItemToOrder(MenuItemOrderInputModel item, string userId)
        {
            if (item.IsIdEmpty())
            {
                throw new ArgumentException();
            }

            var order = this.repo.All()
                .Where(uo => uo.UserId.Equals(userId))
                .Select(uo => uo.Order)
                .SingleOrDefault();

            var menuItemOrder = new MenuItemOrder()
            {
                MenuItemPriceId = item.Id,
                UserId = userId,
            };

            order.MenuItemOrders.Add(menuItemOrder);

            this.repo.Save();
        }

        public IEnumerable<OrderedMenuItemBoardViewModel> GetOrderedItems(string userId)
        {
            var result = this.repo.All()
                .Where(uo => uo.UserId.Equals(userId))
                .SelectMany(uo => uo.Order.MenuItemOrders)
                .Select(m => new OrderedMenuItemBoardViewModel()
                {
                    Id = m.Id,
                    ItemName = m.MenuItemPrice.MenuItem.Name,
                    Option = m.MenuItemPrice.Type,
                    Price = m.MenuItemPrice.Price.ToString(),
                    UserName = m.User.UserName,
                    DateTime = m.DateTime,
                })
                .ToList();

            return result;
        }

        public void HasActiveOrderCheck(string userId)
        {
            var hasActiveOrder = this.repo.All()
                .Any(uo => uo.UserId.Equals(userId));

            if (hasActiveOrder)
            {
                throw new EntityExistsException("Active order");
            }
        }
    }
}
