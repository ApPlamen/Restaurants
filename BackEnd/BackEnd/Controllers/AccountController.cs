using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DAL.InputModels;
using Services;
using Microsoft.AspNetCore.Authorization;

namespace Domain.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class AccountController : BaseServiceController<IAccountService>
    {
        public AccountController(IAccountService service)
            : base(service)
        { }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginAsync(LoginUserInputModel model)
        {
            var result = await this.service.LoginAsync(model);

            return this.Ok(result);
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterAsync(RegisterUserInputModel model)
        {
            await this.service.RegisterAsync(model);

            return this.Ok();
        }

        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> RefreshAsync(RefreshTokensInputModel model)
        {
            object result = await this.service.RefreshTokensAsync(model.RefreshToken);
            return this.Ok(result);
        }
    }
}
