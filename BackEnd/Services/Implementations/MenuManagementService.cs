using AutoMapper;
using DAL.InputModels;
using DAL.Models;
using DAL.Repository;
using DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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

        public IEnumerable<MenuItemViewModel> GetAll(string restaurantId)
        {
            var result = this.repo.All()
                .Where(m => m.RestaurantId.Equals(restaurantId))
                .Select(m => new MenuItemViewModel()
                {
                    Id = m.Id,
                    Name = m.Name,
                })
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
    }
}
