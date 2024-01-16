using Azon.Areas.Identity.Data;

using System;
using System.Collections.Generic;

namespace Azon.Models;

public partial class ShippingDetail
{
    public int ShippingDetailId { get; set; }

    public string? CustomerId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? Mobile { get; set; }

    public string? Address { get; set; }

    public string? Country { get; set; }
    public string? Info { get; set; }
    public string? City { get; set; }

    public string? PostCode { get; set; }

    public virtual ApplicationUser? Customer { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
