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
    public class ItemOrderManagementController : BaseServiceController<IItemOrderManagementService>
    {
        public ItemOrderManagementController(IItemOrderManagementService service)
            : base(service)
        { }

        [Route("set-status")]
        [HttpPut]
        [AuthorizeRoles(RoleIds.Admin, RoleIds.CompanyOwner, RoleIds.RestaurantAdmin, RoleIds.Restaurant)]
        public IActionResult SetOrderedItemStatus(OrderedItemStatusInputModel model)
        {
            this.service.SetOrderedItemStatus(model);
            return this.Ok();
        }

        [Route("ask-remove")]
        [HttpPut]
        [AuthorizeRoles(RoleIds.Client)]
        public IActionResult AskToRemove(OrderedItemStatusInputModel model)
        {
            this.service.AskToRemove(model);
            return this.Ok();
        }
    }
}
