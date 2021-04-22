using Microsoft.AspNetCore.Mvc;
using Services;
using Common.Authentication;
using Domain.Extensions;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using DAL.InputModels;

namespace Domain.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class MenuManagementController : BaseServiceController<IMenuManagementService>
    {
        public MenuManagementController(IMenuManagementService service)
            : base(service)
        { }

        [Route("restaurant/{restaurantId}/menu")]
        [HttpGet]
        [AuthorizeRoles(RoleIds.Admin, RoleIds.CompanyOwner, RoleIds.RestaurantAdmin, RoleIds.Restaurant)]
        public IActionResult GetAll(string restaurantId)
        {
            var result = this.service.GetAll(restaurantId);
            return this.Ok(result);
        }

        [Route("{id}")]
        [HttpGet]
        //[AuthorizeRoles(RoleIds.Admin)]
        public IActionResult Get(string id)
        {
            var result = this.service.Get(id);
            return this.Ok(result);
        }

        [HttpPost]
        //[AuthorizeRoles(RoleIds.Admin)]
        public IActionResult Save(MenuItemInputModel model)
        {
            this.service.Save(model);
            return this.Ok();
        }

        [Route("{id}")]
        [HttpDelete]
        //[AuthorizeRoles(RoleIds.Admin)]
        public IActionResult Delete(string id)
        {
            this.service.Delete(id);
            return this.Ok();
        }

        [Route("available")]
        [HttpPut]
        //[AuthorizeRoles(RoleIds.Admin, RoleIds.CompanyOwner, RoleIds.RestaurantAdmin, RoleIds.Restaurant)]
        public IActionResult ToggleAvailable(AvailableInputModel<string> model)
        {
            this.service.ToggleAvailable(model);
            return this.Ok();
        }

        [Route("restaurant/{restaurantId}/canActivate")]
        [HttpGet]
        [AuthorizeRoles(RoleIds.Admin, RoleIds.CompanyOwner, RoleIds.RestaurantAdmin, RoleIds.Restaurant)]
        public async Task<IActionResult> CanActivate(string restaurantId)
        {
            var userId = User.GetAuthUserId();

            var result = await this.service.CanActivate(userId, restaurantId);
            return this.Ok(result);
        }
    }
}
