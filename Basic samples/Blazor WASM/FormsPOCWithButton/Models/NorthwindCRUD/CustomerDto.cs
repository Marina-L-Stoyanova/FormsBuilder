namespace FormsPOCWithButton.Models.NorthwindCRUD;

public class CustomerDto: ICloneable
{
    public string CustomerId { get; set; }
    public string CompanyName { get; set; }
    public string ContactName { get; set; }
    public string ContactTitle { get; set; }
    public AddressDto Address { get; set; } = new();

    public object Clone()
    {
        return new CustomerDto
        {
            CustomerId = CustomerId,
            CompanyName = CompanyName,
            ContactName = ContactName,
            ContactTitle = ContactTitle,
            Address = Address.Clone() as AddressDto,
        };
    }
}
