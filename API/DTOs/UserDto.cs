namespace API.DTOs;

public class UserDto
{
    public string Email { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public BasketDto Basket { get; set; } = new BasketDto();
}
