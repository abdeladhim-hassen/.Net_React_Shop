using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class CreateProductDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty ;

    [Required]
    [Range(100, Double.PositiveInfinity)]
    public long Price { get; set; }

    [Required]
    public IFormFile File { get; set; } = null!;

    [Required]
    public string Type { get; set; } = string.Empty;

    [Required]
    public string Brand { get; set; } = string.Empty;

    [Required]
    [Range(0, 200)]
    public int QuantityInStock { get; set; }
}
