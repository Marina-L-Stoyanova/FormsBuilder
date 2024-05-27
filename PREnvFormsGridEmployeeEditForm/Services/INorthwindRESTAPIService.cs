using PREnvFormsGridEmployeeEditForm.Models.NorthwindRESTAPI;

namespace PREnvFormsGridEmployeeEditForm.NorthwindRESTAPI
{
  public interface INorthwindRESTAPIService
  {
    Task<List<EmployeeDto>> GetEmployeeDtoList();
    Task<List<AddressDto>> GetCountriesDtoList();
    Task<EmployeeDto> PutEmployee(EmployeeDto? data);
  }
}
