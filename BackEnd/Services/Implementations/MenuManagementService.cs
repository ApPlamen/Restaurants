using AutoMapper;
using DAL.InputModels;
using DAL.Models;
using DAL.Repository;
using DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public class MenuManagementService : BaseCRUDSoftDeleteService<MenuItem, MenuItemViewModel, MenuItemInputModel, string>, IMenuManagementService
    {
        private readonly IRepository<Restaurant> restaurant;

        public MenuManagementService(IMapper mapper,
            IRepository<MenuItem> DALModel,
            IRepository<Restaurant> restaurant,
            UserManager<User> userManager)
            : base(mapper, DALModel, userManager)
        {
            this.restaurant = restaurant;
        }

        public IEnumerable<MenuItemBoardViewModel> GetAll(string restaurantId)
        {
            var result = this.repo.All()
                .Where(m => m.IsActive)
                .Where(m => m.RestaurantId.Equals(restaurantId))
                .Select(m => new MenuItemBoardViewModel()
                {
                    Id = m.Id,
                    Name = m.Name,
                    StartPrice = m.MenuItemPrices
                        .Where(mp => mp.IsActive)
                        .Min(mp => mp.Price)
                        .ToString(),
                    IsAvailable = m.IsAvailable,
                })
                .ToList();

            return result;
        }

        public void ToggleAvailable(AvailableInputModel<string> model)
        {
            var menuItem = this.repo.GetById(model.Id);

            menuItem.IsAvailable = model.Available;

            this.repo.Save();
        }

        public async Task<List<string>> GetRestaurantUserRoles(string userId, string restaurantId)
        {
            var user = await userManager.Users
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == userId);

            var result = this.restaurant.All()
                .Include(u => u.UserRoles)
                .Where(r => r.Id.Equals(restaurantId) && r.IsActive)
                .SelectMany(r => r.UserRoles)
                .Where(ur => ur.UserId.Equals(user.Id))
                .Select(ur => ur.Role.Name)
                .Union(this.restaurant.All()
                    .Where(r => r.Id.Equals(restaurantId) && r.IsActive)
                    .SelectMany(r => r.Company.UserRoles)
                    .Where(ur => ur.UserId.Equals(user.Id))
                    .Select(ur => ur.Role.Name))
                .ToList();

            return result;
        }

        public async Task<bool> CanActivate(string userId, string restaurantId)
        {
            var user = await userManager.Users
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == userId);

            var result = this.restaurant.All()
                .Where(r => r.Id.Equals(restaurantId) && r.IsActive)
                .RestaurantsFilterByUser(user)
                .Any();

            return result;
        }

        protected override void Create(MenuItem model)
        {
            model.Id = Guid.NewGuid().ToString();
            base.Create(model);
        }
    }
}
