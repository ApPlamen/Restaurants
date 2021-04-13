using AutoMapper;
using Common.Authentication;
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
    public class RestaurantService : BaseCRUDService<Restaurant, RestaurantViewModel, RestaurantInputModel, string>, IRestaurantService
    {
        public RestaurantService(IMapper mapper,
            IRepository<Restaurant> restaurant,
            UserManager<User> userManager)
            : base(mapper, restaurant, userManager)
        {
        }

        public async Task<IEnumerable<RestaurantViewModel>> GetAll(string userId)
        {
            var user = await userManager.Users
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == userId);

            var result = this.repo.GetAll()
                .RestaurantsFilterByUser(user)
                .Select(r => new RestaurantViewModel()
                {
                    Id = r.Id,
                    Name = r.Name,
                    CompanyName = r.Company.Name,
                    CanManageRestaurantWorkers = r.UserRoles.Any(ur => ur.UserId.Equals(userId) && ur.RoleId.Equals(RoleIds.RestaurantAdmin)),
                    CanManageRestaurantAdmins = r.Company.UserRoles.Any(ur => ur.UserId.Equals(userId)),
                })
                .ToList();

            return result;
        }

        protected override void Create(Restaurant model)
        {
            model.Id = Guid.NewGuid().ToString();
            this.repo.Add(model);
        }
    }
}
