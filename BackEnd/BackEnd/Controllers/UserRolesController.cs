using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DAL.InputModels;
using Services;

namespace Domain.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class UserRolesController : BaseServiceController<IUserRolesService>
    {
        public UserRolesController(IUserRolesService service)
            : base(service)
        { }

        [Route("assign-role")]
        [HttpPost]
        public IActionResult AssignRole(UserRolesInputModel model)
        {
            this.service.AssignRole(model.UserId, model.RoleIds, model.Payload);
            return this.Ok();
        }

        [Route("unassign-role")]
        [HttpPost]
        public IActionResult UnassignRole(UserRolesInputModel model)
        {
            this.service.UnassignRole(model.UserId, model.RoleIds, model.Payload);
            return this.Ok();
        }
    }
}
