using DAL.InputModels;
using DAL.Models;
using DAL.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface IMenuManagementService : IBaseCRUDService<MenuItem, MenuItemViewModel, MenuItemInputModel, string>, IBaseService
    {
        public IEnumerable<MenuItemBoardViewModel> GetAll(string restaurantId);

        public void ToggleAvailable(AvailableInputModel<string> model);

        public Task<List<string>> GetRestaurantUserRoles(string userId, string restaurantId);

        public Task<bool> CanActivate(string userId, string restaurantId);
    }
}
