using Azon.Areas.Identity.Data;
using Azon.Models;

using System;
using System.Collections.Generic;

namespace Azon.Models;

public partial class WishlistItem
{
    public int WishlistItemId { get; set; }

    public string? CustomerId { get; set; }

    public int ProductId { get; set; }

    public int OriginalProductId { get; set; }

    public int Count { get; set; }

    public DateTime DateAdded { get; set; }

    public virtual ApplicationUser? Customer { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;

    public virtual Product OriginalProduct { get; set; } = null!;

    public virtual Wishlist? Wishlist { get; set; } = null!;
}