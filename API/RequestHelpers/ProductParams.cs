namespace API.RequestHelpers;

public class ProductParams : PaginationParams
{
    public string OrderBy { get; set; } = string.Empty;
    public string SearchTerm { get; set; } = string.Empty;
    public string Types { get; set; } = string.Empty;
    public string Brands { get; set; } = string.Empty;
}
