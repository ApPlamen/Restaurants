using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using DAL.Models;
using DAL.InputModels;
using DAL.Repository;
using DAL.ViewModels;
using Exceptions;
using System;

namespace Services
{
    public class UserService : BaseCRUDService<User, UserViewModel, UserInputModel, string>, IUserService
    {
        public UserService(IMapper mapper,
            IRepository<User> user)
            : base(mapper, user)
        { }

        public override UserViewModel Get(string id)
        {
            var result = this.repo.All()
                .FirstOrDefault(u => u.Id.Equals(id));

            return mapper.Map<UserViewModel>(result);
        }

        public override void Save(UserInputModel model)
        {
            if (model.IsIdEmpty())
            {
                throw new ArgumentException();
            }

            var user = this.repo.All().FirstOrDefault(u => u.Id.Equals(model.Id));

            if (user == null)
            {
                throw new UserDoesntExistsException();
            }

            user.UserName = model.UserName;
            user.Fullname = model.Fullname;
            //user.PasswordHash = new PasswordHasher<User>().HashPassword(user, model.PasswordHash);

            user.NormalizedUserName = user.UserName.ToUpper();

            this.repo.Save(user);
        }
    }
}
