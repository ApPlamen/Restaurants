using Common.Authentication;
using DAL.Models;
using LinqKit;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace Services
{
    public static class Filters
    {
        public static Expression<Func<Restaurant, bool>> RestaurantsFilterByUser(User user)
        {
            var predicate = PredicateBuilder.New<Restaurant>();

            if (user.UserRoles.Any(ur => ur.RoleId.Equals(RoleIds.CompanyOwner)))
            {
                predicate.Or(r => r.Company.UserRoles.Any(ur => ur.UserId.Equals(user.Id)));
            }

            if (user.UserRoles.Any(ur => ur.RoleId.Equals(RoleIds.RestaurantAdmin)
                || ur.RoleId.Equals(RoleIds.Restaurant)))
            {
                predicate.Or(r => r.UserRoles.Any(ur => ur.UserId.Equals(user.Id)));
            }

            return predicate;
        }
    }
}
