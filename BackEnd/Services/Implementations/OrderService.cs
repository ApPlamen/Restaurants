﻿using AutoMapper;
using DAL.InputModels;
using DAL.Models;
using DAL.Repository;
using Exceptions;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace Services
{
    public class OrderService : BaseService<Order>, IOrderService
    {
        private readonly IRepository<Restaurant> restaurant;
        private readonly IUserOrderService userOrderService;
        private readonly object lockObj = new();

        public OrderService(IMapper mapper,
            IRepository<Order> order,
            IRepository<Restaurant> restaurant,
            IUserOrderService userOrderService,
            UserManager<User> userManager)
            : base(mapper, order, userManager)
        {
            this.restaurant = restaurant;
            this.userOrderService = userOrderService;
        }

        public string StartOrder(OrderDetailsInputModel orderDetails, string userId)
        {
            this.userOrderService.HasActiveOrderCheck(userId);

            var restaurantId = this.restaurant.All()
                .Where(r => r.Name.Equals(orderDetails.RestaurantName))
                .Select(r => r.Id)
                .SingleOrDefault();

            if (restaurantId == null)
            {
                throw new EntityNotFoundException("Restaurant");
            }

            var order = new Order()
            {
                RestaurantId = restaurantId,
                TableNumber = orderDetails.TableNumber,
            };

            string orderId;
            bool exists;

            lock (lockObj)
            {
                do
                {
                    orderId = StringGenerator.RandomString(6);
                    exists = this.repo.All().Any(o => o.Id.Equals(orderId));
                } while (exists);

                order.Id = orderId;
                order.UserOrders.Add(new UserOrder()
                {
                    UserId = userId,
                });

                this.repo.Add(order);

                this.repo.Save();
            }

            return orderId;
        }

        public void JionOrder(string orderId, string userId)
        {
            this.userOrderService.HasActiveOrderCheck(userId);

            var order = this.repo.GetById(orderId);

            if (order == null)
            {
                throw new EntityNotFoundException("Order");
            }

            order.UserOrders.Add(new UserOrder()
            {
                UserId = userId
            });

            this.repo.Save();
        }
    }
}
