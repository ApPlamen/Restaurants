using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using DAL.Models;
using DAL.InputModels;
using DAL.Repository;
using DAL.ViewModels;
using Microsoft.EntityFrameworkCore;

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
                .Include(u => u.Roles)
                .ThenInclude(r => r.Role)
                .FirstOrDefault(u => u.Id.Equals(id));

            return mapper.Map<UserViewModel>(result);
        }

        protected override void Create(User model)
        {
            model.Id = Guid.NewGuid().ToString();
            model.PasswordHash = new PasswordHasher<User>().HashPassword(model, model.PasswordHash);

            model.NormalizedEmail = model.Email.ToUpper();
            model.NormalizedUserName = model.UserName.ToUpper();

            this.repo.Add(model);
        }

        protected override void Update(User model)
        {
            var user = this.repo.All().FirstOrDefault(u => u.Id.Equals(model.Id));

            user.UserName = model.UserName;
            user.Email = model.Email;
            user.Fullname = model.Fullname;
            user.PasswordHash = new PasswordHasher<User>().HashPassword(user, model.PasswordHash);
            //user.RoleId = model.RoleId;

            user.NormalizedEmail = user.Email.ToUpper();
            user.NormalizedUserName = user.UserName.ToUpper();

            this.repo.Save(user);
        }
    }
}
