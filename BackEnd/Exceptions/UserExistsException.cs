using System;

namespace Exceptions
{
    public class UserExistsException : Exception
    {
        public new const string Message = "User Exists";

        public UserExistsException() : base(message: Message) { }
    }
}
