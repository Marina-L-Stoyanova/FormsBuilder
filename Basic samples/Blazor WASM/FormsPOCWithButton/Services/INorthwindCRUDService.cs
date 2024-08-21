using FormsPOCWithButton.Models.NorthwindCRUD;

namespace FormsPOCWithButton.Services
{
    public interface INorthwindCRUDService
    {
        Task<CustomerDto> GetCustomerDto(string? id);

        Task<CustomerDto> PostCustomerDto(CustomerDto? data);

        Task<CustomerDto> PutCustomerDto(CustomerDto? data);
    }
}
