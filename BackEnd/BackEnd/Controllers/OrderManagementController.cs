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
    public class OrderManagementController : BaseServiceController<IOrderManagementService>
    {
        public OrderManagementController(IOrderManagementService service)
            : base(service)
        { }

        [Route("restaurant/{restaurantId}/restaurant-orders")]
        [HttpGet]
        [AuthorizeRoles(RoleIds.CompanyOwner, RoleIds.RestaurantAdmin, RoleIds.Restaurant)]
        public IActionResult GetRestaurantOrders(string restaurantId)
        {
            var result = this.service.GetRestaurantOrders(restaurantId);
            return this.Ok(result);
        }

        [Route("restaurant/{restaurantId}/ordered-menu-items")]
        [HttpGet]
        [AuthorizeRoles(RoleIds.CompanyOwner, RoleIds.RestaurantAdmin, RoleIds.Restaurant)]
        public IActionResult GetOrderedMenuItems(string restaurantId)
        {
            var result = this.service.GetOrderedMenuItems(restaurantId);
            return this.Ok(result);
        }

        [Route("close-order/{orderId}")]
        [HttpDelete]
        [AuthorizeRoles(RoleIds.CompanyOwner, RoleIds.RestaurantAdmin, RoleIds.Restaurant)]
        public IActionResult CloseOrder(string orderId)
        {
            var userId = User.GetAuthUserId();

            this.service.CloseOrder(orderId, userId);
            return this.Ok();
        }

        [Route("restaurant/{restaurantId}/canActivate")]
        [HttpGet]
        [AuthorizeRoles(RoleIds.CompanyOwner, RoleIds.RestaurantAdmin, RoleIds.Restaurant)]
        public async Task<IActionResult> CanActivate(string restaurantId)
        {
            var userId = User.GetAuthUserId();

            var result = await this.service.CanActivate(userId, restaurantId);
            return this.Ok(result);
        }
    }
}
