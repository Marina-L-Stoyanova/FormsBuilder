using System.Net.Http.Json;
using FormsPOCWithButton.Models.NorthwindCRUD;

namespace FormsPOCWithButton.Services
{
    public class NorthwindCRUDService : INorthwindCRUDService
    {
        private readonly HttpClient _http;

        public NorthwindCRUDService(HttpClient http)
        {
            _http = http;
        }

        public async Task<CustomerDto> GetCustomerDto(string? id)
        {
            if (id == null)
            {
                return null;
            }

            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, new Uri($"https://data-northwind.indigo.design/Customers/{id}", UriKind.RelativeOrAbsolute));
            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<CustomerDto>().ConfigureAwait(false);
            }

            return null;
        }

        public async Task<CustomerDto> PostCustomerDto(CustomerDto? data)
        {
            if (data == null)
            {
                return null;
            }

            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, new Uri("https://data-northwind.indigo.design/Customers", UriKind.RelativeOrAbsolute));
            // To get token:
            // 1. Go to https://data-northwind.indigo.design/swagger/index.html.
            // 2. Execute /Auth/Register end point with default value.
            // 3. The returned value is the barer token.
            request.Headers.Add("Authorization", "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImQ0ZTkyNTVlLWRmM2ItNDAzMC1hMzQ0LWFmNWUyNzg4YmU3ZSIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJqdGkiOiIzMDdjZDI3Ny0yYzhiLTQzZTUtYTg5MS1lNzZlMGFkNjA4ODkiLCJuYmYiOjE3MjQxNTMwODYsImV4cCI6MTcyNDE1MzM4NiwiaWF0IjoxNzI0MTUzMDg2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIn0.7pJNHA-IG3IQxv6IuR9Gsz5IWiSPpLBeoZpBlCYdTcVdUZ1gRckE4y0XAhY9_YgFNSEUBlCQGWLuXLUCYyfADQ");
            request.Content = JsonContent.Create(data);
            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<CustomerDto>().ConfigureAwait(false);
            }

            return null;
        }

        public async Task<CustomerDto> PutCustomerDto(CustomerDto? data)
        {
            if (data == null)
            {
                return null;
            }

            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Put, new Uri("https://data-northwind.indigo.design/Customers", UriKind.RelativeOrAbsolute));
            // To get token:
            // 1. Go to https://data-northwind.indigo.design/swagger/index.html.
            // 2. Execute /Auth/Register end point with default value.
            // 3. The returned value is the barer token.
            request.Headers.Add("Authorization", "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImQ0ZTkyNTVlLWRmM2ItNDAzMC1hMzQ0LWFmNWUyNzg4YmU3ZSIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJqdGkiOiIzMDdjZDI3Ny0yYzhiLTQzZTUtYTg5MS1lNzZlMGFkNjA4ODkiLCJuYmYiOjE3MjQxNTMwODYsImV4cCI6MTcyNDE1MzM4NiwiaWF0IjoxNzI0MTUzMDg2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIn0.7pJNHA-IG3IQxv6IuR9Gsz5IWiSPpLBeoZpBlCYdTcVdUZ1gRckE4y0XAhY9_YgFNSEUBlCQGWLuXLUCYyfADQ");
            request.Content = JsonContent.Create(data);
            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<CustomerDto>().ConfigureAwait(false);
            }

            return null;
        }
    }
}
