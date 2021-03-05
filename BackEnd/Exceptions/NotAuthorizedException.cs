using System.Security.Authentication;

namespace Exceptions
{
    public class NotAuthorizedException : AuthenticationException
    {
        public new const string Message = "Not Authorized";

        public NotAuthorizedException() : base(message: Message) { }
    }
}
