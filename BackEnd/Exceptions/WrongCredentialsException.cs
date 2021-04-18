using System;

namespace Exceptions
{
    public class WrongCredentialsException : ArgumentException
    {
        public new const string Message = "Wrong Credentials!";

        public WrongCredentialsException() : base(message: Message) { }
    }
}
