using UntitledApp114.Models.NorthWindCRUD;

namespace UntitledApp114.NorthWindCRUD
{
    public class MockNorthWindCRUDService : INorthWindCRUDService
    {
        public Task<CustomerInputModel> PostCustomerInputModel(object? data)
        {
            return Task.FromResult<CustomerInputModel>(new());
        }
    }
}
