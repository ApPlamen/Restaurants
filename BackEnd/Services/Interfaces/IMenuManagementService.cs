using DAL.InputModels;
using DAL.Models;
using DAL.ViewModels;
using System.Threading.Tasks;

namespace Services
{
    public interface IMenuManagementService : IBaseCRUDService<MenuItem, MenuItemViewModel, MenuItemInputModel, string>, IBaseService
    {
        public Task<bool> CanActivate(string userId, string restaurantId);
    }
}
