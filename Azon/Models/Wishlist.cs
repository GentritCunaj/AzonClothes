using Azon.Areas.Identity.Data;

using System;
using System.Collections.Generic;

namespace Azon.Models;

public partial class Wishlist
{
    public int WishlistId { get; set; }

    public string? CustomerId { get; set; }

    public bool isCompleted { get; set; } = false;
    public List<WishlistItem> Items { get; set; } = new List<WishlistItem>();
    public virtual ApplicationUser? Customer { get; set; } = null!;

}
