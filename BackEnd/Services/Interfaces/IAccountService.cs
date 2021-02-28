using System.Threading.Tasks;
using DAL.InputModels;
using DAL.ViewModels;

namespace Services
{
    public interface IAccountService : IBaseService
    {
        Task<UserTokensViewModel> LoginAsync(LoginUserInputModel model);

        Task<UserTokensViewModel> RefreshTokensAsync(string refreshToken);
    }
}
