using PREnvFormsGridEmployeeEditForm.Models.NorthwindRESTAPI;

namespace PREnvFormsGridEmployeeEditForm.NorthwindRESTAPI
{
  public interface INorthwindRESTAPIService
  {
        Task<EmployeeDto> DeleteEmployee(int? id);
        Task<List<AddressDto>> GetCountriesDtoList();
    Task<List<EmployeeDto>> GetEmployeeDtoList();
        Task<EmployeeDto> PostEmployee(EmployeeDto? data);
    Task<EmployeeDto> PutEmployee(EmployeeDto? data);
  }
}
