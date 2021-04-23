using Microsoft.AspNetCore.Mvc;
using Services;
using Common.Authentication;
using Domain.Extensions;
using Microsoft.AspNetCore.Authorization;
using DAL.InputModels;

namespace Domain.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class MenuPriceController : BaseServiceController<IMenuPriceService>
    {
        public MenuPriceController(IMenuPriceService service)
            : base(service)
        { }

        [Route("menuItem/{menuItemId}/prices")]
        [HttpGet]
        [AuthorizeRoles(RoleIds.CompanyOwner, RoleIds.RestaurantAdmin, RoleIds.Client)]
        public IActionResult GetAll(string menuItemId)
        {
            var result = this.service.GetAll(menuItemId);
            return this.Ok(result);
        }

        [Route("{id}")]
        [HttpGet]
        [AuthorizeRoles(RoleIds.CompanyOwner, RoleIds.RestaurantAdmin)]
        public IActionResult Get(string id)
        {
            var result = this.service.Get(id);
            return this.Ok(result);
        }

        [HttpPost]
        [AuthorizeRoles(RoleIds.CompanyOwner, RoleIds.RestaurantAdmin)]
        public IActionResult Save(MenuItemPriceInputModel model)
        {
            this.service.Save(model);
            return this.Ok();
        }

        [Route("{id}")]
        [HttpDelete]
        [AuthorizeRoles(RoleIds.CompanyOwner, RoleIds.RestaurantAdmin)]
        public IActionResult Delete(string id)
        {
            this.service.Delete(id);
            return this.Ok();
        }
    }
}
