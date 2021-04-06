using DAL.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface IUserRolesService
    {
        Task AssignRole(string userEmail, string roleId, string payload);

        Task UnassignRole(string userId, string roleId, string payload);

        Task<IEnumerable<UserViewModel>> GetUsersOfRole(string roleId, string payload);
    }
}
