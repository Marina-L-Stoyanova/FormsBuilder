using FormsPOCWithButton.Models.NorthwindCRUD;

namespace FormsPOCWithButton.Services
{
    public interface INorthwindCRUDService
    {
        Task<CustomerDto> PostCustomerDto(CustomerDto? data);
    }
}
