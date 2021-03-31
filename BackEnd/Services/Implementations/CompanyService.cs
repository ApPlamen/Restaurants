using AutoMapper;
using DAL.InputModels;
using DAL.Models;
using DAL.Repository;
using DAL.ViewModels;
using Microsoft.AspNetCore.Identity;

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
    }
}
