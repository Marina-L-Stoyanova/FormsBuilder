using Microsoft.AspNetCore.Components;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;

namespace FormsSample.Models;

public class Starship
{
    [Required]
    [StringLength(16, ErrorMessage = "Identifier too long (16 character limit).")]
    public string? Id { get; set; }

    public string? Description { get; set; }

    [Required (ErrorMessage ="This field is required")]
    public string? Classification { get; set; }

    [Range(1, 100000, ErrorMessage = "Accommodation invalid (1-100000).")]
    public int MaximumAccommodation { get; set; }

    [Required]
    [Range(typeof(bool), "true", "true", ErrorMessage = "Approval required.")]
    public bool IsValidatedDesign { get; set; }

    [Required]
    [Range(typeof(DateTime),"2024-1-1","2024-12-31")]
    public DateTime ProductionDate { get; set; }


    [Required]
    public DateTime Date { get; set; }


    [Phone(ErrorMessage ="Enter valid phone number")]
    public string Phone { get; set; }

    [Required(ErrorMessage = "This field is required")]
    [RegularExpression(@"^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$", ErrorMessage = "Enter First Name and Last Name")]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required(ErrorMessage = "Your password is required")]
    public string? Password { get; set; }

    [Required(ErrorMessage = "The password confirmation is required")]
    [Compare("Password", ErrorMessage = "Password and password confirmation don't match")]
    public string? PasswordConfirmation { get; set; }
}