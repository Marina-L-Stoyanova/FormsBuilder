namespace FormsPOCWithButton.Models.NorthwindCRUD;

public class CustomerDto
{
    public string CustomerId { get; set; }
    public string CompanyName { get; set; }
    public string ContactName { get; set; }
    public string ContactTitle { get; set; }
    public AddressDto Address { get; set; }
}
