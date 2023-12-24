using Azon.Areas.Identity.Data;
using Azon.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Azon.Data;

public class AzonContext : IdentityDbContext<ApplicationUser>
{
    public AzonContext(DbContextOptions<AzonContext> options)
        : base(options)
    {
    }
    public DbSet<ShippingDetail> ShippingDetails { get; set; }

    public DbSet<Wishlist> Wishlists { get; set; }

    public DbSet<WishlistItem> WishlistItems { get; set; }

    public DbSet<Product> Products { get; set; }

    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // Customize the ASP.NET Identity model and override the defaults if needed.
        // For example, you can rename the ASP.NET Identity table names and more.
        // Add your customizations after calling base.OnModelCreating(builder);
    }
}
