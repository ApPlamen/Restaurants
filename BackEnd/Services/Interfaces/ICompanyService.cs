using DAL.InputModels;
using DAL.Models;
using DAL.ViewModels;

namespace Services
{
    public interface ICompanyService : IBaseCRUDService<Company, CompanyViewModel, CompanyInputModel, string>, IBaseService
    {
    }
}
