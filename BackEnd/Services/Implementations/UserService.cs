using AutoMapper;
using DAL.Models;
using DAL.InputModels;
using DAL.Repository;
using DAL.ViewModels;
using Exceptions;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Services
{
    public class UserService : BaseCRUDSoftDeleteService<User, UserViewModel, UserInputModel, string>, IUserService
    {
        public UserService(IMapper mapper,
            IRepository<User> user,
            UserManager<User> userManager)
            : base(mapper, user, userManager)
        {
        }

        public new async Task<UserViewModel> Get(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);

            return mapper.Map<UserViewModel>(user);
        }

        public new async Task Save(UserInputModel model)
        {
            if (model.IsIdEmpty())
            {
                throw new ArgumentException();
            }

            var user = await userManager.FindByIdAsync(model.Id);

            if (user == null)
            {
                throw new EntityDoesNotExistsException("User");
            }

            user.UserName = model.UserName;
            user.Fullname = model.Fullname;

            user.NormalizedUserName = user.UserName.ToUpper();

            this.repo.Save(user);
        }

        public async Task ChangePassword(string userId, ChangePasswordInputModel model)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentException();
            }

            var user = await userManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new EntityDoesNotExistsException("User");
            }

            var validCurrentPassword = await userManager.CheckPasswordAsync(user, model.CurrentPassword);

            if(!validCurrentPassword)
            {
                throw new ArgumentException();
            }

            await userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
        }
    }
}
