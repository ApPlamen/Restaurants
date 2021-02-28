using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DAL.InputModels;
using Services;

namespace Domain.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class UserController : BaseServiceController<IUserService>
    {
        public UserController(IUserService service)
            : base(service)
        { }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = this.service.GetAll();
            return this.Ok(result);
        }

        [Route("{id}")]
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet]
        public IActionResult Get(string id)
        {
            var result = this.service.Get(id);
            return this.Ok(result);
        }

        [HttpPost]
        [Authorize(Policy = "RequireAdminRole")]
        public IActionResult Save(UserInputModel model)
        {
            this.service.Save(model);
            return this.Ok();
        }

        [Route("{id}")]
        [HttpDelete]
        [Authorize(Policy = "RequireAdminRole")]
        public IActionResult Delete(string id)
        {
            this.service.Delete(id);
            return this.Ok();
        }
    }
}
