using System;

namespace Exceptions
{
    public class EntityExistsException : ArgumentException
    {
        public new const string Message = "{0} already exists!";

        public EntityExistsException(string entityName)
            : base(message: string.Format(Message, entityName)) { }
    }
}
