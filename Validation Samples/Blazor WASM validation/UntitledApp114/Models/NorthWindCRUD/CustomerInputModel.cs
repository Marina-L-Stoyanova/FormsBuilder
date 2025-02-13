using System.ComponentModel.DataAnnotations;

namespace UntitledApp114.Models.NorthWindCRUD;

public class CustomerInputModel: ICloneable
{
    [Required(ErrorMessage = "This field is required")]
    [StringLength(3, ErrorMessage = "Identifier too long (3 character limit).")]
    public string CustomerId { get; set; }
    public string CompanyName { get; set; }
    public string ContactName { get; set; }
    public string ContactTitle { get; set; }
    public AddressInputModel Address { get; set; } = new();

    public object Clone()
    {
        return new CustomerInputModel
        {
            CustomerId = CustomerId,
            CompanyName = CompanyName,
            ContactName = ContactName,
            ContactTitle = ContactTitle,
            Address = Address.Clone() as AddressInputModel,
        };
    }
}
