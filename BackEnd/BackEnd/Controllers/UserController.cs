﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DAL.InputModels;
using Services;
using Domain.Extensions;
using System.Threading.Tasks;
using Common.Authentication;

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
        [AuthorizeRoles(RoleIds.Admin)]
        public IActionResult GetAll()
        {
            var result = this.service.GetAll();
            return this.Ok(result);
        }

        [Route("profile")]
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var userId = User.GetAuthUserId();

            var result = await this.service.GetAsync(userId);
            return this.Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> SaveAsync(UserInputModel model)
        {
            model.Id = User.GetAuthUserId();

            await this.service.SaveAsync(model);
            return this.Ok();
        }

        [Route("change-password")]
        [HttpPut]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordInputModel model)
        {
            var userId = User.GetAuthUserId();

            await this.service.ChangePasswordAsync(userId, model);
            return this.Ok();
        }
    }
}
