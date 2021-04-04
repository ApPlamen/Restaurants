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
    public class RestaurantService : BaseCRUDService<Restaurant, RestaurantViewModel, RestaurantInputModel, string>, IRestaurantService
    {
        public RestaurantService(IMapper mapper,
            IRepository<Restaurant> restaurant,
            UserManager<User> userManager)
            : base(mapper, restaurant, userManager)
        {
        }

        public override IEnumerable<RestaurantViewModel> GetAll()
        {
            var result = this.repo.All()
                .Select(r => new RestaurantViewModel()
                {
                    Id = r.Id,
                    Name = r.Name,
                    CompanyName = r.Company.Name,
                })
                .ToList();

            return result;
        }
    }
}
