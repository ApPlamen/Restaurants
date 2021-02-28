using Microsoft.AspNetCore.Identity;
using System.Linq;
using Common.Authentication;
using DAL.Models;

namespace DAL.Extensions
{
    public static class DbInitializer
    {
        public static void Initialize(this Context data)
        {
            SeedRoles(data);
            SeedAdmin(data);

            data.SaveChanges();
        }

        private static void SeedRoles(Context data)
        {
            if (data.Roles.Count() == 0)
            {
                data.Roles.Add(new Role()

                {
                    Id = RoleIds.Admin,
                    ConcurrencyStamp = "637fe1ac-8683-47ba-a95b-234ca60c5385",
                    Name = RoleStrings.Admin,
                    NormalizedName = RoleStrings.Admin.ToUpper()
                });

                data.Roles.Add(new Role()
                {
                    Id = RoleIds.Client,
                    ConcurrencyStamp = "5cda244b-53e2-4e25-909a-52d0c5e4f045",
                    Name = RoleStrings.Client,
                    NormalizedName = RoleStrings.Client.ToUpper()
                });

                data.Roles.Add(new Role()
                {
                    Id = RoleIds.Restaurant,
                    ConcurrencyStamp = "8d6399c8-0143-4163-836e-82605879693b",
                    Name = RoleStrings.Restaurant,
                    NormalizedName = RoleStrings.Restaurant.ToUpper()
                });

                data.Roles.Add(new Role()
                {
                    Id = RoleIds.RestaurantAdmin,
                    ConcurrencyStamp = "05c98c74-75e6-43bc-bd40-a33b49d70446",
                    Name = RoleStrings.RestaurantAdmin,
                    NormalizedName = RoleStrings.RestaurantAdmin.ToUpper()
                });
            }
        }

        private static void SeedAdmin(Context data)
        {
            if (!data.UserRoles.Any(ur => ur.RoleId.Equals(RoleIds.Admin)))
            {
                User admin = new User()
                {
                    Id = "8e13686a-ce33-4f7e-b599-5f7f0db57e72",
                    AccessFailedCount = 0,
                    ConcurrencyStamp = "7a5a5685-9a1f-4284-bca9-2d2974b89e37",
                    Email = "admin@admin.com",
                    EmailConfirmed = false,
                    LockoutEnabled = true,
                    NormalizedEmail = "ADMIN@ADMIN.COM",
                    NormalizedUserName = "ADMIN",
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    UserName = "admin",
                    Fullname = "Administrator",
                };
                admin.PasswordHash = new PasswordHasher<User>().HashPassword(admin, "1111111");

                data.Users.Add(admin);

                UserRole userRole = new UserRole()
                {
                    UserId = admin.Id,
                    RoleId = RoleIds.Admin,
                };

                data.UserRoles.Add(userRole);
            }
        }
    }
}
