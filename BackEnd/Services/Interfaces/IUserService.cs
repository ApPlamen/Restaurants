using System.Threading.Tasks;
using DAL.InputModels;
using DAL.Models;
using DAL.ViewModels;

namespace Services
{
    public interface IUserService : IBaseCRUDService<User, UserViewModel, UserInputModel, string>, IBaseService
    {
        public Task<UserViewModel> GetAsync(string userId);

        public Task SaveAsync(UserInputModel model);

        public Task ChangePasswordAsync(string userId, ChangePasswordInputModel model);
    }
}
