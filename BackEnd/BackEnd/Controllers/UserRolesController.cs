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
        public async Task<IActionResult> AssignRole(AssignUserRoleInputModel model)
        {
            await this.service.AssignRole(model.UserEmail, model.RoleId, model.Payload);
            return this.Ok();
        }

        [Route("unassign-role")]
        [HttpPost]
        public async Task<IActionResult> UnassignRole(UnassignUserRoleInputModel model)
        {
            await this.service.UnassignRole(model.UserId, model.RoleId, model.Payload);
            return this.Ok();
        }

        [Route("users")]
        [HttpPost]
        public async Task<IActionResult> GetUsersOfRole(UserRoleRequestModel model)
        {
            var users = await this.service.GetUsersOfRole(model.RoleId, model.Payload);
            return this.Ok(users);
        }
    }
}
