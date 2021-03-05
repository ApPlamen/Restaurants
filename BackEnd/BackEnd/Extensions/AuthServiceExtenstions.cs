using System;
using System.Security.Claims;

namespace Domain.Extensions
{
    public static class AuthServiceExtenstions
    {
        public static string GetAuthUserId(this ClaimsPrincipal user)
        {
            if(user == null)
            {
                throw new ArgumentException();
            }

            var userId = user.FindFirst(ClaimTypes.NameIdentifier).Value;
            return userId;
        }
    }
}
