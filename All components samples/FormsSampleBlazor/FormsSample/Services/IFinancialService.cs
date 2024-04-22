using FormsSample.Models.Financial;

namespace FormsSample.Financial
{
    public interface IFinancialService
    {
        Task<List<BoxOfficeRevenueType>> GetBoxOfficeRevenue();
    }
}
