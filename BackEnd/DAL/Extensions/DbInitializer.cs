using Microsoft.AspNetCore.Identity;
using System.Linq;
using Common.Authentication;
using DAL.Models;
using System.Collections.Generic;

namespace DAL.Extensions
{
    public static class DbInitializer
    {
        public static void Initialize(this Context data)
        {
            SeedRoles(data);
            SeedAdmin(data);
            SeedRestaurantAndCompany(data);

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

                data.Roles.Add(new Role()
                {
                    Id = RoleIds.CompanyOwner,
                    ConcurrencyStamp = "38921a10-79fa-49d1-8c91-6a03761d84ef",
                    Name = RoleStrings.CompanyOwner,
                    NormalizedName = RoleStrings.CompanyOwner.ToUpper()
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

        private static void SeedRestaurantAndCompany(Context data)
        {
            if (data.Restaurants.Count() == 0 && data.Companies.Count() == 0)
            {
                var admin = new User()
                {
                    Id = "8e13686a-ce33-4f7e-b599-5f7f0db57e72",
                };

                Company company = new Company()
                {
                    Id = "ca76d562-7e0e-4d62-922e-39bd94e629c5",
                    LegalId = "1",
                    Name = "Test Company",
                };

                data.Companies.Add(company);

                UserRole userRoleCompany = new UserRole()
                {
                    UserId = admin.Id,
                    RoleId = RoleIds.CompanyOwner,
                    Companies = new List<Company>() { company }
                };

                data.UserRoles.Add(userRoleCompany);

                Restaurant restaurant = new Restaurant()
                {
                    Id = "ca76d562-7e0e-4d62-922e-39bd94e629c5",
                    Name = "Test Restaurant",
                    LegalId = "1",
                    Company = company,
                };

                data.Restaurants.Add(restaurant);

                UserRole userRoleRestaurantAdmin = new UserRole()
                {
                    UserId = admin.Id,
                    RoleId = RoleIds.RestaurantAdmin,
                    Restaurants = new List<Restaurant>() { restaurant },
                };

                data.UserRoles.Add(userRoleRestaurantAdmin);

                UserRole userRoleRestaurant = new UserRole()
                {
                    UserId = admin.Id,
                    RoleId = RoleIds.Restaurant,
                    Restaurants = new List<Restaurant>() { restaurant },
                };

                data.UserRoles.Add(userRoleRestaurant);
            }
        }
    }
}
