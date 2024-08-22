using Server_Forms_POC.Models.NorthwindREST;

namespace Server_Forms_POC.NorthwindREST
{
    public class MockNorthwindRESTService : INorthwindRESTService
    {
        public Task<CustomerDto> GetCustomerDto(string? id)
        {
            return Task.FromResult<CustomerDto>(new());
        }

        public Task<CustomerDto> PostCustomerDto(CustomerDto? data)
        {
            return Task.FromResult<CustomerDto>(new());
        }

        public Task<CustomerDto> PutCustomerDto(CustomerDto? data)
        {
            return Task.FromResult<CustomerDto>(new());
        }
    }
}
