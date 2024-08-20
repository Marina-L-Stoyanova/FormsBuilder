using System.ComponentModel.DataAnnotations;

namespace PREnvFormsGridEmployeeEditForm.Models.NorthwindRESTAPI;

public class EmployeeDto
{
    public int EmployeeId { get; set; }
    [Required(ErrorMessage = "Last Name is required.")]
    [StringLength(15, MinimumLength = 2, ErrorMessage = "Last name is too short or too long.")]
    public string LastName { get; set; }

    // Validation for FirstName is Handled in View.razor via onBlur. Uncomment for Option2.
    //[Required(ErrorMessage = "First Name is required.")]
    //[StringLength(15, MinimumLength = 2, ErrorMessage = "First Name must be between 2 and 15 characters.")]
    public string FirstName { get; set; }

    [Required]
    [StringLength(45, MinimumLength = 2, ErrorMessage = "Title is too short or too long.")]
    public string Title { get; set; }

    public string TitleOfCourtesy { get; set; }
    //Build Error for nullable hiring date for datePicker here --> IgbDatePicker @bind-Value="@selectedEmployee.HireDate"
    //ISSUE: https://infragistics.visualstudio.com/NetAdvantage/_workitems/edit/31333/
    //public DateTime? BirthDate { get; set; }
    //public DateTime? HireDate { get; set; }

    public DateTime BirthDate { get; set; }

    [Required]
    [Range(typeof(DateTime), "1988-1-1", "2024-05-31")]
    public DateTime HireDate { get; set; }

    public string AddressId { get; set; }

    [Required]
    public AddressDto Address { get; set; } = new(); //1)CodeGen: Will generate the nested types with instantiation in the model via CodeGen!
    public string Notes { get; set; }
    public string AvatarUrl { get; set; }
    public int ReportsTo { get; set; }
}
