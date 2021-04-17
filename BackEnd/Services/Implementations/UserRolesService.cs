using AutoMapper;
using Common.Authentication;
using DAL.Models;
using DAL.Repository;
using DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Services
{
    public class UserRolesService : BaseService<UserRole>, IUserRolesService
    {
        private readonly IRepository<Company> companyRepo;
        private readonly IRepository<Restaurant> restaurantRepo;

        public UserRolesService(IMapper mapper,
            IRepository<UserRole> userRole,
            IRepository<Company> companyRepo,
            IRepository<Restaurant> restaurantRepo,
            UserManager<User> userManager)
            : base(mapper, userRole, userManager)
        {
            this.companyRepo = companyRepo;
            this.restaurantRepo = restaurantRepo;
        }

        public async Task AssignRole(string userEmail, string roleId, string payload = null)
        {
            var user = await userManager.FindByEmailAsync(userEmail);

            var exists = this.repo.All()
                .Include(ur => ur.Restaurants)
                .Include(ur => ur.Companies)
                .FirstOrDefault(ur => ur.UserId.Equals(user.Id) && ur.RoleId.Equals(roleId));

            switch (roleId)
            {
                case RoleIds.Admin:
                case RoleIds.Client:
                    var userRole = new UserRole()
                    {
                        UserId = user.Id,
                        RoleId = roleId,
                    };
                    this.repo.Add(userRole);
                    break;

                case RoleIds.CompanyOwner:
                    var company = companyRepo.All().FirstOrDefault(c => c.Id.Equals(payload));

                    if (exists != null)
                    {
                        exists.Companies.Add(company);
                    }
                    else
                    {
                        var userRoleCompany = new UserRole()
                        {
                            UserId = user.Id,
                            RoleId = roleId,
                            Companies = new List<Company>() { company },
                        };
                        this.repo.Add(userRoleCompany);
                    }
                    break;

                case RoleIds.RestaurantAdmin:
                case RoleIds.Restaurant:
                    var restaurant = restaurantRepo.All().FirstOrDefault(r => r.Id.Equals(payload));

                    if (exists != null)
                    {
                        exists.Restaurants.Add(restaurant);
                    }
                    else
                    {
                        var userRoleRestaurant = new UserRole()
                        {
                            UserId = user.Id,
                            RoleId = roleId,
                            Restaurants = new List<Restaurant>() { restaurant },
                        };
                        this.repo.Add(userRoleRestaurant);
                    }
                    break;
            }

            this.repo.Save();
        }

        public void UnassignRole(string userId, string roleId, string payload = null)
        {
            var role = this.repo.All()
                .Include(ur => ur.Restaurants)
                .Include(ur => ur.Companies)
                .FirstOrDefault(ur => ur.UserId.Equals(userId) && ur.RoleId.Equals(roleId));

            switch (roleId)
            {
                case RoleIds.CompanyOwner:
                    var company = companyRepo.All().FirstOrDefault(c => c.Id.Equals(payload));

                    role.Companies.Remove(company);
                    if(role.Companies.Count > 0)
                    {
                        this.repo.Save();
                        return;
                    }
                    break;

                case RoleIds.RestaurantAdmin:
                case RoleIds.Restaurant:
                    var restaurant = restaurantRepo.All().FirstOrDefault(r => r.Id.Equals(payload));

                    role.Restaurants.Remove(restaurant);
                    if (role.Restaurants.Count > 0)
                    {
                        this.repo.Save();
                        return;
                    }
                    break;
            }

            this.repo.Delete(role);
            this.repo.Save();
        }

        public async Task<IEnumerable<UserViewModel>> GetUsersOfRole(string roleId, string payload = null)
        {
            var users = await this.repo.All()
                .Include(ur => ur.Restaurants)
                .Include(ur => ur.Companies)
                .Where(FilterByCompanyOrRestaurant(payload))
                .Where(ur => ur.RoleId.Equals(roleId))
                .Select(ur => ur.User)
                .Select(u => new UserViewModel
                {
                    Id = u.Id,
                    Fullname = u.Fullname,
                    Email = u.Email,
                })
                .ToListAsync();

            return users;
        }

        public static Expression<Func<UserRole, bool>> FilterByCompanyOrRestaurant(string payload)
        {
            if(payload==null)
            {
                return ur => true;
            }

            return ur => ur.Restaurants.Any(r => r.Id.Equals(payload))
                || ur.Companies.Any(c => c.Id.Equals(payload));
        }
    }
}
