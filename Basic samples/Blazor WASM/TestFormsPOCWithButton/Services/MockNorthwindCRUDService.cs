using FormsPOCWithButton.Models.NorthwindCRUD;

namespace FormsPOCWithButton.Services
{
    public class MockNorthwindCRUDService : INorthwindCRUDService
    {
        public Task<CustomerDto> GetCustomerDto(string id)
        {
            return Task.FromResult<CustomerDto>(new());
        }

        public Task<CustomerDto> PostCustomerDto(CustomerDto data)
        {
            return Task.FromResult<CustomerDto>(new());
        }

        public Task<CustomerDto> PutCustomerDto(CustomerDto data)
        {
            return Task.FromResult<CustomerDto>(new());
        }
    }
}
