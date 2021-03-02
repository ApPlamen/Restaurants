using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DAL.InputModels;
using Services;
using Domain.Extensions;

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
        [Authorize(Policy = "RequireAdminRole")]
        public IActionResult GetAll()
        {
            var result = this.service.GetAll();
            return this.Ok(result);
        }

        [Route("profile")]
        [HttpGet]
        public IActionResult Get()
        {
            var userId = User.GerAuthUserId();

            var result = this.service.Get(userId);
            return this.Ok(result);
        }

        [HttpPost]
        public IActionResult Save(UserInputModel model)
        {
            model.Id = User.GerAuthUserId();

            this.service.Save(model);
            return this.Ok();
        }

        /*[Route("{id}")]
        [HttpDelete]
        public IActionResult Delete(string id)
        {
            this.service.Delete(id);
            return this.Ok();
        }*/
    }
}
