using Microsoft.AspNetCore.Mvc;
using Services;
using DAL.InputModels;
using Common.Authentication;
using Domain.Extensions;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace Domain.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class RestaurantController : BaseServiceController<IRestaurantService>
    {
        public RestaurantController(IRestaurantService service)
            : base(service)
        { }

        [HttpGet]
        [AuthorizeRoles(RoleIds.Admin, RoleIds.CompanyOwner, RoleIds.RestaurantAdmin, RoleIds.Restaurant)]
        public async Task<IActionResult> GetAll()
        {
            var userId = User.GetAuthUserId();

            var result = await this.service.GetAll(userId);
            return this.Ok(result);
        }

        [Route("{id}")]
        [HttpGet]
        [AuthorizeRoles(RoleIds.Admin)]
        public IActionResult Get(string id)
        {
            var result = this.service.Get(id);
            return this.Ok(result);
        }

        [HttpPost]
        [AuthorizeRoles(RoleIds.Admin)]
        public IActionResult Save(RestaurantInputModel model)
        {
            this.service.Save(model);
            return this.Ok();
        }

        [Route("{id}")]
        [HttpDelete]
        [AuthorizeRoles(RoleIds.Admin)]
        public IActionResult Delete(string id)
        {
            this.service.Delete(id);
            return this.Ok();
        }
    }
}
