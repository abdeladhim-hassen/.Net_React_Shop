using System.ComponentModel.DataAnnotations;

namespace API.Entities.OrderAggregate;

public class Order
{
    public int Id { get; set; }
    public string BuyerId { get; set; } = string.Empty;

    [Required]
    public ShippingAddress ShippingAddress { get; set; } = new ShippingAddress();
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public List<OrderItem> OrderItems { get; set; } = [];
    public long Subtotal { get; set; }
    public long DeliveryFee { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public string PaymentIntentId { get; set; } = string.Empty;

    public long GetTotal()
    {
        return Subtotal + DeliveryFee;
    }
}
