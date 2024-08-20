using FormsPOCWithButton.Models.NorthwindCRUD;

namespace FormsPOCWithButton.Services
{
    public class MockNorthwindCRUDService : INorthwindCRUDService
    {
        public Task<CustomerDto> PostCustomerDto(CustomerDto data)
        {
            return Task.FromResult<CustomerDto>(new());
        }
    }
}
