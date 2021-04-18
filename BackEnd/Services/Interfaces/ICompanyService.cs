using DAL.InputModels;
using DAL.Models;
using DAL.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface ICompanyService : IBaseCRUDService<Company, CompanyViewModel, CompanyInputModel, string>, IBaseService
    {
        public Task<IEnumerable<CompanyViewModel>> GetAll(string userId);

        new Task Delete(string id);
    }
}
