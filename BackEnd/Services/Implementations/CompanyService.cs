using AutoMapper;
using DAL.InputModels;
using DAL.Models;
using DAL.Repository;
using DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;

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

        public override IEnumerable<CompanyViewModel> GetAll()
        {
            var result = this.repo.All()
                .Select(c => new CompanyViewModel()
                {
                    Id = c.Id,
                    Name = c.Name,
                    Owners = c.UserRoles.Select(ur => ur.UserId)
                })
                .ToList();

            return result;
        }
    }
}
