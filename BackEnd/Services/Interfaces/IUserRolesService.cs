namespace Services
{
    public interface IUserRolesService
    {
        void AssignRole(string userId, string roleIds, string payload = null);

        void UnassignRole(string userId, string roleIds, string payload = null);
    }
}
