namespace API.DTOs;

public class RegisterDto : LoginDto
{
    public string Email { get; set; } = string.Empty;
}
