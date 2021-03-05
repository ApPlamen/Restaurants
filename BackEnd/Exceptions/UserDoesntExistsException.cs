using System;

namespace Exceptions
{
    public class UserDoesntExistsException : Exception
    {
        public new const string Message = "User Doesn't Exists";

        public UserDoesntExistsException() : base(message: Message) { }
    }
}
