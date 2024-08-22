namespace FormsPOCWithButton.Models.NorthwindCRUD;

public class AddressDto: ICloneable
{
    public string Street { get; set; }
    public string City { get; set; }
    public string Region { get; set; }
    public string PostalCode { get; set; }
    public string Country { get; set; }
    public string Phone { get; set; }

    public object Clone()
    {
        return new AddressDto
        {
            Street = Street,
            City = City,
            Region = Region,
            PostalCode = PostalCode,
            Country = Country,
            Phone = Phone
        };
    }
}
