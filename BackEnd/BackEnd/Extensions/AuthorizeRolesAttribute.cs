using Microsoft.AspNetCore.Authorization;

namespace Domain.Extensions
{

    public class AuthorizeRolesAttribute : AuthorizeAttribute
    {
        public AuthorizeRolesAttribute(params string[] roles) : base()
        {
            Roles = string.Join(", ", roles);
        }
    }
}
