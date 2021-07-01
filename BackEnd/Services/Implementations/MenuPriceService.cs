using AutoMapper;
using DAL.InputModels;
using DAL.Models;
using DAL.Repository;
using DAL.ViewModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Services
{
    public class MenuPriceService : BaseCRUDSoftDeleteService<MenuItemPrice, MenuItemPriceViewModel, MenuItemPriceInputModel, string>, IMenuPriceService
    {
        public MenuPriceService(IMapper mapper,
            IRepository<MenuItemPrice> DALModel,
            UserManager<User> userManager)
            : base(mapper, DALModel, userManager)
        { }

        public IEnumerable<MenuItemPriceViewModel> GetAll(string menuItemId)
        {
            var result = this.repo.All()
                .Where(mp => mp.MenuItemId.Equals(menuItemId))
                .Where(mp => mp.IsActive)
                .ToList();

            return mapper.Map<IEnumerable<MenuItemPriceViewModel>>(result); ;
        }

        protected override void Create(MenuItemPrice model)
        {
            model.Id = Guid.NewGuid().ToString();
            base.Create(model);
        }
    }
}
