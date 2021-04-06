using DAL.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface IUserRolesService
    {
        Task AssignRole(string userEmail, string roleIds, string payload = null);

        Task UnassignRole(string userEmail, string roleIds, string payload = null);

        Task<IEnumerable<UserViewModel>> GetUsersOfRole(string roleIds, string payload = null);
    }
}
