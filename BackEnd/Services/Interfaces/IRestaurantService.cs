using DAL.InputModels;
using DAL.Models;
using DAL.ViewModels;

namespace Services
{
    public interface IRestaurantService : IBaseCRUDService<Restaurant, RestaurantViewModel, RestaurantInputModel, string>, IBaseService
    {
    }
}
