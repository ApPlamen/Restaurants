using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DAL.InputModels;
using Services;
using System.Threading.Tasks;

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
        public async Task<IActionResult> AssignRole(UserRolesInputModel model)
        {
            await this.service.AssignRole(model.UserEmail, model.RoleIds, model.Payload);
            return this.Ok();
        }

        [Route("unassign-role")]
        [HttpPost]
        public async Task<IActionResult> UnassignRole(UserRolesInputModel model)
        {
            await this.service.UnassignRole(model.UserEmail, model.RoleIds, model.Payload);
            return this.Ok();
        }

        [Route("users")]
        [HttpPost]
        public async Task<IActionResult> GetUsersOfRole(UserRolesInputModel model)
        {
            var users = await this.service.GetUsersOfRole(model.RoleIds, model.Payload);
            return this.Ok(users);
        }
    }
}
