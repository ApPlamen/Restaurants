using AutoMapper;
using DAL.InputModels;
using DAL.Models;
using DAL.Repository;
using DAL.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace Services
{
    public class RestaurantService : BaseCRUDService<Restaurant, RestaurantViewModel, RestaurantInputModel, string>, IRestaurantService
    {
        public RestaurantService(IMapper mapper,
            IRepository<Restaurant> restaurant,
            UserManager<User> userManager)
            : base(mapper, restaurant, userManager)
        {
        }
    }
}
