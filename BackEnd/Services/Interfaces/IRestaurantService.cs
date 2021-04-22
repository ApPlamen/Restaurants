using DAL.InputModels;
using DAL.Models;
using DAL.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface IRestaurantService : IBaseCRUDService<Restaurant, RestaurantViewModel, RestaurantInputModel, string>, IBaseService
    {
        public Task<IEnumerable<RestaurantBoardViewModel>> GetAll(string userId);
    }
}
