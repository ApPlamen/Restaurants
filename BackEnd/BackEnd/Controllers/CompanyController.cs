using Microsoft.AspNetCore.Mvc;
using Services;
using DAL.InputModels;
using Domain.Extensions;
using Common.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace Domain.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class CompanyController : BaseServiceController<ICompanyService>
    {
        public CompanyController(ICompanyService service)
            : base(service)
        { }

        [HttpGet]
        [AuthorizeRoles(RoleIds.Admin, RoleIds.CompanyOwner)]
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
        public IActionResult Save(CompanyInputModel model)
        {
            this.service.Save(model);
            return this.Ok();
        }

        [Route("{id}")]
        [HttpDelete]
        [AuthorizeRoles(RoleIds.Admin)]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await this.service.Delete(id);
            return this.Ok();
        }
    }
}
