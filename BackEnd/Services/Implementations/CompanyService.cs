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
        public CompanyService(IMapper mapper,
            IRepository<Company> company,
            UserManager<User> userManager)
            : base(mapper, company, userManager)
        {
        }

        public async Task<IEnumerable<CompanyViewModel>> GetAll(string userId)
        {
            var user = await userManager.Users
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == userId);

            var result = this.repo.All()
                .Where(m => m.IsActive)
                .CompaniesFilterByUser(user)
                .Select(c => new CompanyViewModel()
                {
                    Id = c.Id,
                    Name = c.Name,
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
    }
}
