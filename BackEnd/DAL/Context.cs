using DAL.Models;
using Enums;
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

        public DbSet<MenuItem> Menu { get; set; }

        public DbSet<MenuItemPrice> Prices { get; set; }

        public DbSet<UserOrder> UserOrders { get; set; }

        public DbSet<MenuItemOrder> MenuItemOrders { get; set; }

        public DbSet<Order> Orders { get; set; }

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

            builder.Entity<MenuItem>(menuItem =>
            {
                menuItem.Property("Name").IsRequired();

                menuItem.Property("Description").HasColumnType("ntext");

                menuItem.Property("IsAvailable").HasDefaultValue(false);
                menuItem.Property("IsActive").HasDefaultValue(true);

                menuItem.HasOne(m => m.Restaurant)
                    .WithMany(r => r.MenuItems)
                    .HasForeignKey(m => m.RestaurantId)
                    .IsRequired();
            });

            builder.Entity<MenuItemPrice>(menuItem =>
            {
                menuItem.Property("Type").IsRequired();

                menuItem.Property("Price").HasPrecision(20, 2);

                menuItem.Property("IsActive").HasDefaultValue(true);

                menuItem.HasOne(mp => mp.MenuItem)
                    .WithMany(m => m.MenuItemPrices)
                    .HasForeignKey(mp => mp.MenuItemId)
                    .IsRequired();
            });

            builder.Entity<UserOrder>(userOrder =>
            {
                userOrder.HasKey("UserId");

                userOrder.HasOne(uo => uo.User)
                    .WithOne(u => u.UserOrder)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<MenuItemOrder>(menuItemOrder =>
            {
                menuItemOrder.Property("OrderedItemStatus")
                    .HasDefaultValue(OrderedItemStatusesEnum.New);

                menuItemOrder.HasOne(mio => mio.Order)
                    .WithMany(o => o.MenuItemOrders)
                    .HasForeignKey(mio => mio.OrderId)
                    .IsRequired();

                menuItemOrder.HasOne(mio => mio.MenuItemPrice)
                    .WithMany(mi => mi.MenuItemOrders)
                    .HasForeignKey(mio => mio.MenuItemPriceId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict);

                menuItemOrder.HasOne(mio => mio.User)
                    .WithMany(u => u.MenuItemOrders)
                    .HasForeignKey(mio => mio.UserId)
                    .IsRequired();
            });

            builder.Entity<Order>(order =>
            {
                order.HasIndex(o => new { o.RestaurantId, o.TableNumber })
                    .IsUnique();

                order.HasOne(o => o.Restaurant)
                    .WithMany(r => r.Orders)
                    .HasForeignKey(o => o.RestaurantId)
                    .IsRequired();

                order.HasMany(o => o.UserOrders)
                    .WithOne(uo => uo.Order)
                    .HasForeignKey(uo => uo.OrderId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
