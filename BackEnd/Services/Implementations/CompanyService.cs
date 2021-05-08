using AutoMapper;
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
    public class CompanyService : BaseCRUDSoftDeleteService<Company, CompanyViewModel, CompanyInputModel, string>, ICompanyService
    {
        private readonly IRepository<Restaurant> restaurant;

        public CompanyService(IMapper mapper,
            IRepository<Company> company,
            IRepository<Restaurant> restaurant,
            UserManager<User> userManager)
            : base(mapper, company, userManager)
        {
            this.restaurant = restaurant;
        }

        public async Task<IEnumerable<CompanyBoardViewModel>> GetAll(string userId)
        {
            var user = await userManager.Users
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == userId);

            var result = this.repo.All()
                .Where(m => m.IsActive)
                .Where(Filters.CompaniesFilterByUserOrAdmin(user))
                .Select(c => new CompanyBoardViewModel()
                {
                    Id = c.Id,
                    Name = c.Name,
                    LegalId = c.LegalId,
                    Owners = c.UserRoles.Select(ur => ur.User.Email),
                })
                .ToList();

            return result;
        }

        public override void Save(CompanyInputModel model)
        {
            var inputModel = mapper.Map<Company>(model);

            var legalIdExists = this.repo.All()
                .Any(r => r.LegalId.Equals(inputModel.LegalId) && !r.Id.Equals(inputModel.Id));
            if (legalIdExists)
            {
                throw new EntityExistsException("Legal ID");
            }

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

        public new async Task Delete(string id)
        {
            var company = this.repo.GetById(id);

            company.IsActive = false;

            await this.restaurant.All()
                .Where(r => r.Company.Equals(company))
                .ForEachAsync(r => r.IsActive = false);

            this.repo.Save();
        }
    }
}
