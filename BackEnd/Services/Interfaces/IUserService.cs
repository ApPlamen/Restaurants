using System.Threading.Tasks;
using DAL.InputModels;
using DAL.Models;
using DAL.ViewModels;

namespace Services
{
    public interface IUserService : IBaseCRUDService<User, UserViewModel, UserInputModel, string>, IBaseService
    {
        public new Task<UserViewModel> Get(string userId);

        public new Task Save(UserInputModel model);

        public Task ChangePassword(string userId, ChangePasswordInputModel model);
    }
}
