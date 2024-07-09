namespace API.DTOs;

public class OrderItemDto
{
    public int ProductId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string PictureUrl { get; set; } = string.Empty;
    public long Price { get; set; }
    public int Quantity { get; set; }
}
