using UntitledApp114.Models.NorthWindCRUD;

namespace UntitledApp114.NorthWindCRUD
{
    public interface INorthWindCRUDService
    {
        Task<CustomerInputModel> PostCustomerInputModel(object? data);
    }
}
