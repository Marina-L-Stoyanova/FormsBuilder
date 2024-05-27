using System.ComponentModel.DataAnnotations;

namespace PREnvFormsGridEmployeeEditForm.Models.NorthwindRESTAPI;

public class AddressDto
{
  public string Street { get; set; }
  public string City { get; set; }
  public string Region { get; set; }
  public string PostalCode { get; set; }
  [Required]
  public string Country { get; set; }
  [Required]
  [Phone(ErrorMessage = "Enter valid phone number")]
  [RegularExpression(@"^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$", ErrorMessage = "Enter First Name and Last Name")]
  public string Phone { get; set; }
}
