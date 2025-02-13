using System.Net.Http.Json;
using UntitledApp114.Models.NorthWindCRUD;

namespace UntitledApp114.NorthWindCRUD
{
    public class NorthWindCRUDService: INorthWindCRUDService
    {
        private readonly HttpClient _http;

        public NorthWindCRUDService(HttpClient http)
        {
            _http = http;
        }

        public async Task<CustomerInputModel> PostCustomerInputModel(object? data)
        {
            if (data == null)
            {
                return null;
            }

            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, new Uri("https://data-northwind.indigo.design/Customer", UriKind.RelativeOrAbsolute));
            request.Headers.Add("Authorization", "Bearer <auth_value>");
            request.Content = new StringContent(@"{
  ""customerId"": ""string"",
  ""companyName"": ""string"",
  ""contactName"": ""string"",
  ""contactTitle"": ""string"",
  ""address"": {
    ""street"": ""string"",
    ""city"": ""string"",
    ""region"": ""string"",
    ""postalCode"": ""string"",
    ""country"": ""string"",
    ""phone"": ""string""
  }
}", System.Text.Encoding.UTF8, "application/json");
            request.Content = JsonContent.Create(data);
            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<CustomerInputModel>().ConfigureAwait(false);
            }

            return null;
        }
    }
}
