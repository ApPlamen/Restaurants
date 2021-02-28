using System;

namespace Exceptions
{
    public class WrongCredentialsException : ArgumentException
    {
        public new string Message = "Wrong Credentials";
    }
}
