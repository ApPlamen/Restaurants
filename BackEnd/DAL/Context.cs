using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class Context : IdentityDbContext<User, Role, string, IdentityUserClaim<string>, UserRole, IdentityUserLogin<string>, IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public Context() : base()
        { }

        public Context(DbContextOptions<Context> options)
            : base(options)
        { }

        public DbSet<Restaurant> Restaurants { get; set; }

        public DbSet<Company> Companies { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            builder.Entity<Company>(company =>
            {
                company.Property("Name").IsRequired();

                company.Property("LegalId").IsRequired();
                company.HasIndex("LegalId").IsUnique();

                company.Property("IsActive").HasDefaultValue(true);
            });

            builder.Entity<Restaurant>(restaurant =>
            {
                restaurant.Property("Name").IsRequired();

                restaurant.Property("LegalId").IsRequired();
                restaurant.HasIndex("LegalId").IsUnique();

                restaurant.Property("IsActive").HasDefaultValue(true);
            });
        }
    }
}
