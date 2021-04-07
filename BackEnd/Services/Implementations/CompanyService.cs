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
    public class CompanyService : BaseCRUDService<Company, CompanyViewModel, CompanyInputModel, string>, ICompanyService
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
                .CompaniesFilterByUser(user)
                .Select(c => new CompanyViewModel()
                {
                    Id = c.Id,
                    Name = c.Name,
                    Owners = c.UserRoles.Select(ur => ur.User.Email)
                })
                .ToList();

            return result;
        }

        protected override void Create(Company model)
        {
            model.Id = Guid.NewGuid().ToString();
            this.repo.Add(model);
        }
    }
}
