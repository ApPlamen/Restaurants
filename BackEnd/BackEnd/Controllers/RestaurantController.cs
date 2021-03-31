using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using DAL.InputModels;

namespace Domain.Controllers
{
    [Route("[controller]")]
    //[Authorize]
    //[Authorize(Policy = "RequireAdminOrTeacherRole")]
    public class RestaurantController : BaseServiceController<IRestaurantService>
    {
        public RestaurantController(IRestaurantService service)
            : base(service)
        { }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = this.service.GetAll();
            return this.Ok(result);
        }

        [Route("{id}")]
        [HttpGet]
        public IActionResult Get(string id)
        {
            var result = this.service.Get(id);
            return this.Ok(result);
        }

        [HttpPost]

        public IActionResult Save(RestaurantInputModel model)
        {
            this.service.Save(model);
            return this.Ok();
        }

        [Route("{id}")]
        [HttpDelete]
        public IActionResult Delete(string id)
        {
            this.service.Delete(id);
            return this.Ok();
        }
    }
}
