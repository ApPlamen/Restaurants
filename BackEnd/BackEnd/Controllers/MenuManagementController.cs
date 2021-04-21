using Microsoft.AspNetCore.Mvc;
using Services;
using Common.Authentication;
using Domain.Extensions;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

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
