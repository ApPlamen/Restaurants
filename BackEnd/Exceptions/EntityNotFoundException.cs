using System;

namespace Exceptions
{
    public class EntityNotFoundException : ArgumentException
    {
        public new const string Message = "{0} not found!";

        public EntityNotFoundException(string entityName)
            : base(message: string.Format(Message, entityName)) { }
    }
}
