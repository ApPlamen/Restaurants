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
    public class RestaurantService : BaseCRUDSoftDeleteService<Restaurant, RestaurantViewModel, RestaurantInputModel, string>, IRestaurantService
    {
        private readonly IRepository<Company> company;

        public RestaurantService(IMapper mapper,
            IRepository<Restaurant> restaurant,
            IRepository<Company> company,
            UserManager<User> userManager)
            : base(mapper, restaurant, userManager)
        {
            this.company = company;
        }

        public async Task<IEnumerable<RestaurantViewModel>> GetAll(string userId)
        {
            var user = await userManager.Users
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == userId);

            var result = this.repo.GetAll()
                .Where(m => m.IsActive)
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

        public override RestaurantViewModel Get(string id)
        {
            var result = this.repo.GetAll()
                .Where(r => r.Id.Equals(id))
                .Select(r => new RestaurantViewModel()
                {
                    Id = r.Id,
                    Name = r.Name,
                    LegalId = r.LegalId,
                    CompanyLegalId = r.Company.LegalId
                })
                .FirstOrDefault();

            return result;
        }

        public override void Save(RestaurantInputModel model)
        {
            var inputModel = mapper.Map<Restaurant>(model);
            var company = this.company.GetAll().FirstOrDefault(c => c.LegalId.Equals(model.CompanyLegalId));
            inputModel.Company = company;

            if (!model.IsIdEmpty() || this.repo.Exists(inputModel))
            {
                this.Update(inputModel);
            }
            else
            {
                inputModel.Id = Guid.NewGuid().ToString();
                this.Create(inputModel);
            }

            this.repo.Save();
        }
    }
}
