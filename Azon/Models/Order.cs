using Azon.Areas.Identity.Data;

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Azon.Models;

public partial class Order
{

    public enum OrderStatusEnum
    {
        Pending,
        Processing,
        Shipped,
        Delivered,
        Cancelled
    }

    public int WishlistId { get; set; }
    public int OrderId { get; set; }

    public string? CustomerId { get; set; }

  
    public int? ShippingId { get; set; }

    public OrderStatusEnum OrderStatus { get; set; }

    public string? PaymentIntentId { get; set; }
    public string? Status { get; set; }

    public bool PayOnDelivery { get; set; }

    [NotMapped]
    public string OrderStatusName { get; set; }

    public DateTime CreatedDate {  get; set; }

   public DateTime? DeliveredDate { get; set; }

    public DateTime? ShippedDate { get; set; }

    public decimal TotalAmount { get; set; }

    public Wishlist Wishlist { get; set; }
    public virtual ApplicationUser? Customer { get; set; }

    public virtual ShippingDetail? Shipping { get; set; }
   
}
