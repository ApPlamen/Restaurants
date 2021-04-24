using DAL.InputModels;
using DAL.Models;
using DAL.ViewModels;
using System.Collections.Generic;

namespace Services
{
    public interface IMenuPriceService : IBaseCRUDService<MenuItemPrice, MenuItemPriceViewModel, MenuItemPriceInputModel, string>, IBaseService
    {
        public IEnumerable<MenuItemPriceViewModel> GetAll(string menuItemId);
    }
}
