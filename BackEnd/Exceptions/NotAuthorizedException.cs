using System.Security.Authentication;

namespace Exceptions
{
    public class NotAuthorizedException : AuthenticationException
    {
        public new string Message = "Not Authorized";
    }
}
