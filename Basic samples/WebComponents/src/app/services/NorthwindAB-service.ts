import { FetchApi } from './FetchApi-service';
import { CustomerDto } from '../models/NorthwindAB/customer-dto';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

class NorthwindABService {
  public putCustomerDto = async (data: any): Promise<CustomerDto | undefined> => {
    if (!data) {
      return Promise.resolve(undefined);
    }
    const body = JSON.stringify(data);
    const headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImQ0ZTkyNTVlLWRmM2ItNDAzMC1hMzQ0LWFmNWUyNzg4YmU3ZSIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJqdGkiOiIzMDdjZDI3Ny0yYzhiLTQzZTUtYTg5MS1lNzZlMGFkNjA4ODkiLCJuYmYiOjE3MjQxNTMwODYsImV4cCI6MTcyNDE1MzM4NiwiaWF0IjoxNzI0MTUzMDg2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIn0.7pJNHA-IG3IQxv6IuR9Gsz5IWiSPpLBeoZpBlCYdTcVdUZ1gRckE4y0XAhY9_YgFNSEUBlCQGWLuXLUCYyfADQ',
      'Content-Type': 'application/json; charset=utf-8'
    };
    return await FetchApi.fetchApiResponse<CustomerDto | undefined>(`${API_ENDPOINT}/Customers`, undefined, 'PUT', body, headers);
  }

  public postCustomerDto = async (data: any): Promise<CustomerDto | undefined> => {
    if (!data) {
      return Promise.resolve(undefined);
    }
    const body = JSON.stringify(data);
    const headers = {
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImQ0ZTkyNTVlLWRmM2ItNDAzMC1hMzQ0LWFmNWUyNzg4YmU3ZSIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJqdGkiOiIzMDdjZDI3Ny0yYzhiLTQzZTUtYTg5MS1lNzZlMGFkNjA4ODkiLCJuYmYiOjE3MjQxNTMwODYsImV4cCI6MTcyNDE1MzM4NiwiaWF0IjoxNzI0MTUzMDg2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIn0.7pJNHA-IG3IQxv6IuR9Gsz5IWiSPpLBeoZpBlCYdTcVdUZ1gRckE4y0XAhY9_YgFNSEUBlCQGWLuXLUCYyfADQ',
      'Content-Type': 'application/json; charset=utf-8'
    };
    return await FetchApi.fetchApiResponse<CustomerDto | undefined>(`${API_ENDPOINT}/Customers`, undefined, 'POST', body, headers);
  }

  public getCustomerDto = async (id?: string): Promise<CustomerDto> => {
    return await FetchApi.fetchApiResponse<CustomerDto>(`${API_ENDPOINT}/Customers/${id}`, undefined);
  }
}
export const northwindABService: NorthwindABService = new NorthwindABService();
