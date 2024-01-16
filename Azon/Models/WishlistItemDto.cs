using System;
using System.Collections.Generic;

namespace Azon.Models;

public partial class WishlistItemDto
{

    public int ProductId { get; set; }

    public int Count { get; set; } = 1;

    public int OriginalProductId { get; set; }

    public string? Guid { get; set; } = null;


}