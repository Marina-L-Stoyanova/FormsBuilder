using Server_Forms_POC.Models.NorthwindREST;

namespace Server_Forms_POC.NorthwindREST
{
    public interface INorthwindRESTService
    {
        Task<CustomerDto> GetCustomerDto(string? id);
        Task<CustomerDto> PostCustomerDto(CustomerDto? data);
        Task<CustomerDto> PutCustomerDto(CustomerDto? data);
    }
}
