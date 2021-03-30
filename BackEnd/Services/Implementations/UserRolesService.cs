using AutoMapper;
using Common.Authentication;
using DAL.Models;
using DAL.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

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

        public void AssignRole(string userId, string roleIds, string payload = null)
        {
            var exists = this.repo.All()
                .Include(ur => ur.Restaurants)
                .Include(ur => ur.Companies)
                .FirstOrDefault(ur => ur.UserId.Equals(userId) && ur.RoleId.Equals(roleIds));
            
            switch (roleIds)
            {
                case RoleIds.Admin:
                case RoleIds.Client:
                    var userRole = new UserRole()
                    {
                        UserId = userId,
                        RoleId = roleIds,
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
                            UserId = userId,
                            RoleId = roleIds,
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
                            UserId = userId,
                            RoleId = roleIds,
                            Restaurants = new List<Restaurant>() { restaurant },
                        };
                        this.repo.Add(userRoleRestaurant);
                    }
                    break;
            }

            this.repo.Save();
        }

        public void UnassignRole(string userId, string roleIds, string payload = null)
        {
            var role = this.repo.All()
                .Include(ur => ur.Restaurants)
                .Include(ur => ur.Companies)
                .FirstOrDefault(ur => ur.UserId.Equals(userId) && ur.RoleId.Equals(roleIds));

            switch (roleIds)
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
    }
}
