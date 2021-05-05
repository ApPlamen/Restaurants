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
    public class OrderController : BaseServiceController<IOrderService>
    {
        public OrderController(IOrderService service)
            : base(service)
        { }

        [Route("start-order")]
        [HttpPost]
        [AuthorizeRoles(RoleIds.Client)]
        public IActionResult StartOrder(OrderDetailsInputModel orderDetails)
        {
            var userId = User.GetAuthUserId();

            var result = this.service.StartOrder(orderDetails, userId);
            return this.Ok(result);
        }

        [Route("join-order")]
        [HttpPost]
        [AuthorizeRoles(RoleIds.Client)]
        public IActionResult JionOrder(string orderId)
        {
            var userId = User.GetAuthUserId();

            this.service.JionOrder(orderId, userId);
            return this.Ok();
        }

        [Route("get-active-order")]
        [HttpGet]
        [AuthorizeRoles(RoleIds.Client)]
        public IActionResult HasActiveOrder()
        {
            var userId = User.GetAuthUserId();

            var result = this.service.GetActiveOrder(userId);
            return this.Ok(result);
        }

        [Route("close-order")]
        [HttpDelete]
        [AuthorizeRoles(RoleIds.CompanyOwner, RoleIds.RestaurantAdmin, RoleIds.Restaurant)]
        public IActionResult CloseOrder(string orderId)
        {
            var userId = User.GetAuthUserId();

            this.service.CloseOrder(orderId, userId);
            return this.Ok();
        }
    }
}
