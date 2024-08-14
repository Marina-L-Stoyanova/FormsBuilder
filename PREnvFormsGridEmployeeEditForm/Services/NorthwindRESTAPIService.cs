using System.Net.Http.Headers;
using System.Net.Http.Json;
using PREnvFormsGridEmployeeEditForm.Models.NorthwindRESTAPI;

namespace PREnvFormsGridEmployeeEditForm.NorthwindRESTAPI
{
  public class NorthwindRESTAPIService : INorthwindRESTAPIService
  {
    private readonly HttpClient _http;
    private List<EmployeeDto> cachedEmployeeDtoList;

    public NorthwindRESTAPIService(HttpClient http)
    {
      _http = http;
    }

    public async Task<List<EmployeeDto>> GetEmployeeDtoList()
    {
      using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, new Uri("https://data-northwind.indigo.design/Employees", UriKind.RelativeOrAbsolute));
      using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
      if (response.IsSuccessStatusCode)
      {
        cachedEmployeeDtoList = await response.Content.ReadFromJsonAsync<List<EmployeeDto>>().ConfigureAwait(false);

        return cachedEmployeeDtoList;
      }

      return new List<EmployeeDto>();
    }

    // CodeGen[Edge Case]: Create a list of Countries, based on the unique values in the DS records for Country column.
    // Creating a Data Method like this may end up being an optional feature as it sways away from the combo main use case.
    // This method is used by the SingleSelect combo, to fetch all unique country values from a parent Employee model records
    public Task<List<AddressDto>> GetCountriesDtoList()
    {
      List<AddressDto> uniqueCountries = cachedEmployeeDtoList
        .Where(employee => employee.Address != null)
        .Select(employee => employee.Address.Country)
        .Distinct()
        .Select(country => new AddressDto { Country = country })
        .ToList();

      // Add several more countries if they are not already in uniqueCountries
      List<string> additionalCountries = new List<string> { "Germany", "France", "UK" };

      additionalCountries.ForEach(country =>
      {
        if (!uniqueCountries.Any(a => a.Country == country))
        {
          uniqueCountries.Add(new AddressDto { Country = country });
        }
      });

      return Task.FromResult(uniqueCountries);
    }

    public async Task<EmployeeDto> PutEmployee(EmployeeDto? data)
    {
            #region Existing AB CRUD PUT implementation with explicit Content/Model properties defined(and commented out as these are not needed at all!) + Adding Auth line!

      if (data == null)
      {
        return null;
      }
      // CodeGen[Authorization]: Add Authorization Token
            // CodeGen: Optimization: Define Token and Endpoint Uri as variables, instead of passing to the methods directly
      _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIxM2U3YjE1LTFiZjItNDYwMy04YzA3LWY0NDI1ZTk5YTg1YiIsInN1YiI6ImlnYW5jaGV2QGluZnJhZ2lzdGljcy5jb20iLCJlbWFpbCI6ImlnYW5jaGV2QGluZnJhZ2lzdGljcy5jb20iLCJqdGkiOiI1ODIwMTI1Ny1kOWQ1LTQyOTYtOTUzYy1jZTRhZjBhZDEzOGYiLCJuYmYiOjE3MTM4NjMzMDQsImV4cCI6MTcxMzg2MzYwNCwiaWF0IjoxNzEzODYzMzA0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIn0.658Uv_xx5qo-FgkkIa9-5xsf1xMHYbzMqOuDlfVqDtcSWXrD6SoRHL7DsDb9d8xy3AU3ba0CKMq-kuCmUXP7fA");
      using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Put, new Uri("https://data-northwind.indigo.design/Employees", UriKind.RelativeOrAbsolute));
            //request.Content = new StringContent(@"{
            //  ""employeeId"": 123,
            //  ""lastName"": ""string"",
            //  ""firstName"": ""string"",
            //  ""title"": ""string"",
            //  ""titleOfCourtesy"": ""string"",
            //  ""birthDate"": ""string"",
            //  ""hireDate"": ""string"",
            //  ""addressId"": ""string"",
            //  ""address"": {
            //    ""street"": ""string"",
            //    ""city"": ""string"",
            //    ""region"": ""string"",
            //    ""postalCode"": ""string"",
            //    ""country"": ""string"",
            //    ""phone"": ""string""
            //  },
            //  ""notes"": ""string"",
            //  ""avatarUrl"": ""string"",
            //  ""reportsTo"": 123
            //}", System.Text.Encoding.UTF8, "application/json");
      request.Content = JsonContent.Create(data);
      using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
      if (response.IsSuccessStatusCode)
      {
        return await response.Content.ReadFromJsonAsync<EmployeeDto>().ConfigureAwait(false);
      }

      return null;
      #endregion

      #region IG PUT Content optimization - less code with no explicit Content/Model properties defined
      //if (data == null)
      //{
      //  return null;
      //}

      //var endpoint = "https://data-northwind.indigo.design/Employees";
      //string authToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIxM2U3YjE1LTFiZjItNDYwMy04YzA3LWY0NDI1ZTk5YTg1YiIsInN1YiI6ImlnYW5jaGV2QGluZnJhZ2lzdGljcy5jb20iLCJlbWFpbCI6ImlnYW5jaGV2QGluZnJhZ2lzdGljcy5jb20iLCJqdGkiOiI1ODIwMTI1Ny1kOWQ1LTQyOTYtOTUzYy1jZTRhZjBhZDEzOGYiLCJuYmYiOjE3MTM4NjMzMDQsImV4cCI6MTcxMzg2MzYwNCwiaWF0IjoxNzEzODYzMzA0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIn0.658Uv_xx5qo-FgkkIa9-5xsf1xMHYbzMqOuDlfVqDtcSWXrD6SoRHL7DsDb9d8xy3AU3ba0CKMq-kuCmUXP7fA";
      //// Set the authorization token in the request headers
      //_http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);

      //using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Put, new Uri("https://data-northwind.indigo.design/Employees", UriKind.RelativeOrAbsolute));

      //// Serialize selectedEmployee to JSON and set as StringContent, instead of defining Content/Model properties explicitly
      //var jsonContent = JsonSerializer.Serialize(data, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }); //fix PascalCasing
      //// Set the content type to application/json
      //var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

      //request.Content = content;

      //using HttpResponseMessage response = await _http.PutAsync(endpoint, content).ConfigureAwait(false);

      //if (response.IsSuccessStatusCode)
      //{
      //  return await response.Content.ReadFromJsonAsync<EmployeeDto>().ConfigureAwait(false);
      //}

            //return null;
            #endregion
        }
        public async Task<EmployeeDto> PostEmployee(EmployeeDto? data)
        {
            if (data == null)
            {
      return null;
            }
            // CodeGen[Authorization]: Add Authorization Token
            // CodeGen: Optimization: Define Token and Endpoint Uri as variables, instead of passing to the methods directly
            _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImY2MjkwYzhiLWJmNDctNGE3YS1hZjkwLTZjNGFjYTg5OTllZiIsInN1YiI6ImlnYW5jaGV2QGluZnJhZ2lzdGljcy5jb20iLCJlbWFpbCI6ImlnYW5jaGV2QGluZnJhZ2lzdGljcy5jb20iLCJqdGkiOiIyMjU2NmVmNC1kNTlkLTRlMjktYjgzMi1lYmJhMmMyNjc3NmUiLCJuYmYiOjE3MjI4NjExMDYsImV4cCI6MTcyMjg2MTQwNiwiaWF0IjoxNzIyODYxMTA2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIn0.N7dFkAvszD_kWEjkfiNUBxLciRVgLZg58TTM9sxXAckfJNe66xvImFuHm3HlzQ584Q-Kp60IVXuv3aaEzO-V2Q"); //"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIxM2U3YjE1LTFiZjItNDYwMy04YzA3LWY0NDI1ZTk5YTg1YiIsInN1YiI6ImlnYW5jaGV2QGluZnJhZ2lzdGljcy5jb20iLCJlbWFpbCI6ImlnYW5jaGV2QGluZnJhZ2lzdGljcy5jb20iLCJqdGkiOiI1ODIwMTI1Ny1kOWQ1LTQyOTYtOTUzYy1jZTRhZjBhZDEzOGYiLCJuYmYiOjE3MTM4NjMzMDQsImV4cCI6MTcxMzg2MzYwNCwiaWF0IjoxNzEzODYzMzA0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIn0.658Uv_xx5qo-FgkkIa9-5xsf1xMHYbzMqOuDlfVqDtcSWXrD6SoRHL7DsDb9d8xy3AU3ba0CKMq-kuCmUXP7fA");
            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, new Uri("https://data-northwind.indigo.design/Employees", UriKind.RelativeOrAbsolute));

            #region [EndPoint] Fix EndPoint 500 exception for null address obj values either here OR in the Model on Adding new Employee
            //data.Address.PostalCode = "12345";
            //data.Address.City = "New York";
            //data.Address.Street = "123 Main St";
            //data.Address.Region = "NY";
      #endregion
            request.Content = JsonContent.Create(data);

            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false); //500 internal --> ENdpoint Doesnt like null for address obj values
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<EmployeeDto>().ConfigureAwait(false);
            }

            return null;
    }

        public async Task<EmployeeDto> DeleteEmployee(int? id)
        {
            if (id == null)
            {
                return null;
  }
            // CodeGen[Authorization]: Add Authorization Token
            // CodeGen: Optimization: Define Token and Endpoint Uri as variables, instead of passing to the methods directly
            _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIxM2U3YjE1LTFiZjItNDYwMy04YzA3LWY0NDI1ZTk5YTg1YiIsInN1YiI6ImlnYW5jaGV2QGluZnJhZ2lzdGljcy5jb20iLCJlbWFpbCI6ImlnYW5jaGV2QGluZnJhZ2lzdGljcy5jb20iLCJqdGkiOiI1ODIwMTI1Ny1kOWQ1LTQyOTYtOTUzYy1jZTRhZjBhZDEzOGYiLCJuYmYiOjE3MTM4NjMzMDQsImV4cCI6MTcxMzg2MzYwNCwiaWF0IjoxNzEzODYzMzA0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIn0.658Uv_xx5qo-FgkkIa9-5xsf1xMHYbzMqOuDlfVqDtcSWXrD6SoRHL7DsDb9d8xy3AU3ba0CKMq-kuCmUXP7fA");
            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Delete, new Uri($"https://data-northwind.indigo.design/Employees/{id}", UriKind.RelativeOrAbsolute));

            var query = new FormUrlEncodedContent(new Dictionary<string, string>()
            {
                ["id"] = $"{id}",
            }).ReadAsStringAsync().Result;
            request.RequestUri = new UriBuilder(request.RequestUri) { Query = query }.Uri;

            using HttpResponseMessage response = await _http.SendAsync(request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<EmployeeDto>().ConfigureAwait(false);
                // TODO here or in logic fetch latest data from the server
}

            return null;
        }
    }
}
