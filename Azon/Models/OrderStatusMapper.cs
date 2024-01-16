using static Azon.Models.Order;

namespace Azon.Models
{
    public static class OrderStatusMapper
    {
        public static string MapOrderStatusToString(OrderStatusEnum orderStatus)
        {
            switch (orderStatus)
            {
                case OrderStatusEnum.Pending:
                    return "Pending";
                case OrderStatusEnum.Processing:
                    return "Processing";
                case OrderStatusEnum.Shipped:
                    return "Shipped";
                case OrderStatusEnum.Delivered:
                    return "Delivered";
                case OrderStatusEnum.Cancelled:
                    return "Cancelled";
                default:
                    return ""; // Return an empty string for unknown order statuses
            }
        }
    }
}
