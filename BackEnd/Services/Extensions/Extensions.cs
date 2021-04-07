using Common.Authentication;
using DAL.Models;
using System.Linq;

namespace Services
{
    public static class Extensions
    {
        public static IQueryable<Company> CompaniesFilterByUser(this IQueryable<Company> query, User user)
        {
            if (user.UserRoles.Any(ur => ur.RoleId.Equals(RoleIds.Admin)))
            {
                return query.Where(c => true);
            }

            if (user.UserRoles.Any(ur => ur.RoleId.Equals(RoleIds.CompanyOwner)))
            {
                query = query.Where(c => c.UserRoles.Any(ur => ur.UserId.Equals(user.Id)));
            }

            return query;
        }

        public static IQueryable<Restaurant> RestaurantsFilterByUser(this IQueryable<Restaurant> query, User user)
        {
            if (user.UserRoles.Any(ur => ur.RoleId.Equals(RoleIds.Admin)))
            {
                return query.Where(r => true);
            }

            if (user.UserRoles.Any(ur => ur.RoleId.Equals(RoleIds.CompanyOwner)
                || ur.RoleId.Equals(RoleIds.RestaurantAdmin)
                || ur.RoleId.Equals(RoleIds.Restaurant)))
            {
                query = query.Where(r => r.UserRoles.Any(ur => ur.UserId.Equals(user.Id)));
            }

            return query;
        }
    }
}
