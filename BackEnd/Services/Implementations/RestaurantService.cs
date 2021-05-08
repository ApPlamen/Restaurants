using AutoMapper;
using Common.Authentication;
using DAL.InputModels;
using DAL.Models;
using DAL.Repository;
using DAL.ViewModels;
using Exceptions;
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

        public async Task<IEnumerable<RestaurantBoardViewModel>> GetAll(string userId)
        {
            var user = await userManager.Users
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == userId);

            var result = this.repo.All()
                .Where(m => m.IsActive)
                .Where(Filters.RestaurantsFilterByUserOrAdmin(user))
                .Select(r => new
                {
                    Id = r.Id,
                    Name = r.Name,
                    CompanyName = r.Company.Name,
                    LegalId = r.LegalId,
                    HasRestaurantAdminRole = r.UserRoles.Any(ur => ur.UserId.Equals(userId) && ur.RoleId.Equals(RoleIds.RestaurantAdmin)),
                    HasCompanyAdminRole = r.Company.UserRoles.Any(ur => ur.UserId.Equals(userId)),
                    HasRestaurantRole = r.UserRoles.Any(ur => ur.UserId.Equals(userId) && ur.RoleId.Equals(RoleIds.Restaurant)),
                })
                .Select(r => new RestaurantBoardViewModel()
                {
                    Id = r.Id,
                    Name = r.Name,
                    CompanyName = r.CompanyName,
                    LegalId = r.LegalId,
                    CanManageRestaurantWorkers = r.HasRestaurantAdminRole,
                    CanManageRestaurantAdmins = r.HasCompanyAdminRole,
                    CanOpenOrders = r.HasCompanyAdminRole || r.HasRestaurantAdminRole || r.HasRestaurantRole,
                })
                .ToList();

            return result;
        }

        public override RestaurantViewModel Get(string id)
        {
            var result = this.repo.All()
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
            var company = this.company.All().FirstOrDefault(c => c.LegalId.Equals(model.CompanyLegalId));

            if (company == null || !company.IsActive)
            {
                throw new EntityDoesNotExistsException("Company");
            }

            var legalIdExists = this.repo.All()
                .Any(r => r.LegalId.Equals(inputModel.LegalId) && !r.Id.Equals(inputModel.Id));
            if (legalIdExists)
            {
                throw new EntityExistsException("Legal ID");
            }

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
