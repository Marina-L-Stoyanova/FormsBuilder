using WASM_Forms_POC.Models.NorthwindCRUD;

namespace WASM_Forms_POC.Services
{
    public interface INorthwindCRUDService
    {
        Task<CustomerDto> GetCustomerDto(string? id);
        Task<CustomerDto> PostCustomerDto(CustomerDto? data);
        Task<CustomerDto> PutCustomerDto(CustomerDto? data);
    }
}
