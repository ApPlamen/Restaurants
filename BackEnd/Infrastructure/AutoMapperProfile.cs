using AutoMapper;
using DAL.Models;
using DAL.InputModels;
using DAL.ViewModels;

namespace Common.Infrastructure
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserInputModel, User>();
            CreateMap<User, UserViewModel>();

            CreateMap<CompanyInputModel, Company>();
            CreateMap<Company, CompanyViewModel>();

            CreateMap<RestaurantInputModel, Restaurant>();
            CreateMap<Restaurant, RestaurantViewModel>();

            CreateMap<MenuItemInputModel, MenuItem>();
            CreateMap<MenuItem, MenuItemViewModel>();

            CreateMap<MenuItemPriceInputModel, MenuItemPrice>();
            CreateMap<MenuItemPrice, MenuItemPriceViewModel>();
        }
    }
}
