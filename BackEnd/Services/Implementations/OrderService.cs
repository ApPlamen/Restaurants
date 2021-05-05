using AutoMapper;
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
        private readonly IRepository<UserOrder> userOrder;
        private readonly object lockObj = new();

        public OrderService(IMapper mapper,
            IRepository<Order> DALModel,
            IRepository<Restaurant> restaurant,
            IRepository<UserOrder> userOrder,
            UserManager<User> userManager)
            : base(mapper, DALModel, userManager)
        {
            this.restaurant = restaurant;
            this.userOrder = userOrder;
        }

        public string StartOrder(OrderDetailsInputModel orderDetails, string userId)
        {
            this.HasActiveOrderCheck(userId);

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
            this.HasActiveOrderCheck(userId);

            var order = this.repo.GetById(orderId);

            order.UserOrders.Add(new UserOrder()
            {
                UserId = userId
            });

            this.repo.Save();
        }

        public string GetActiveOrder(string userId)
        {
            var result = this.userOrder.All()
                .Where(uo => uo.UserId.Equals(userId))
                .Select(uo => uo.OrderId)
                .SingleOrDefault();

            return result;
        }

        public void CloseOrder(string orderId, string userId)
        {
            var order = this.repo.GetById(orderId);

            this.repo.Delete(order);

            this.repo.Save();
        }

        private void HasActiveOrderCheck(string userId)
        {
            var hasActiveOrder = this.userOrder.All()
                .Any(uo => uo.UserId.Equals(userId));

            if (hasActiveOrder)
            {
                throw new EntityExistsException("Active order");
            }
        }
    }
}
