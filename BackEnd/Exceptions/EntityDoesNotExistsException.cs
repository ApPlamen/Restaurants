using System;

namespace Exceptions
{
    public class EntityDoesNotExistsException : ArgumentException
    {
        public new const string Message = "{0} does not exists!";

        public EntityDoesNotExistsException(string entityName)
            : base(message: string.Format(Message, entityName)) { }
    }
}
