using Microsoft.AspNetCore.Mvc;
using Services;
using Common.Authentication;
using Domain.Extensions;
using Microsoft.AspNetCore.Authorization;
using DAL.InputModels;
using DAL.ViewModels;

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
            return this.Ok(new CodeViewModel()
            {
                Code = result,
            });
        }

        [Route("join-order")]
        [HttpPost]
        [AuthorizeRoles(RoleIds.Client)]
        public IActionResult JionOrder(CodeInputModel orderId)
        {
            var userId = User.GetAuthUserId();

            this.service.JionOrder(orderId.Code, userId);
            return this.Ok();
        }

        [Route("get-active-order")]
        [HttpGet]
        [AuthorizeRoles(RoleIds.Client)]
        public IActionResult GetActiveOrder()
        {
            var userId = User.GetAuthUserId();

            var result = this.service.GetActiveOrder(userId);
            return this.Ok(new CodeViewModel()
            {
                Code = result,
            });
        }

        [Route("menu")]
        [HttpGet]
        [AuthorizeRoles(RoleIds.Client)]
        public IActionResult GetMenu()
        {
            var userId = User.GetAuthUserId();

            var result = this.service.GetMenu(userId);
            return this.Ok(result);
        }

        [Route("add-item-to-order")]
        [HttpPost]
        [AuthorizeRoles(RoleIds.Client)]
        public IActionResult AddItemToOrder(MenuItemOrderInputModel model)
        {
            var userId = User.GetAuthUserId();

            this.service.AddItemToOrder(model, userId);
            return this.Ok();
        }

        //TO BE MOVED
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
