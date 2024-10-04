import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomerDto } from '../models/north-wind-api/customer-dto';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

@Injectable({
  providedIn: 'root'
})
export class NorthWindAPIService {
  constructor(
    private http: HttpClient
  ) { }

  public getCustomerDto(id: string): Observable<CustomerDto | undefined> {
    if (!id) {
      return of(undefined);
    }
    return this.http.get<CustomerDto | undefined>(`${API_ENDPOINT}/Customers/${id}`)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('getCustomerDto', undefined)));
  }

  public putCustomerDto(data: any): Observable<CustomerDto | undefined> {
    if (!data) {
      return of(undefined);
    }
    const options = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjI5ODViMDJmLTBkMGUtNGZiOS05ZGY0LWYxMmYzOTU3MTkzZiIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJqdGkiOiIxYWQ3ZTc0Yi00YmQ1LTRiNzEtYTJlZi1hNDIzNDkwZjQyZGIiLCJuYmYiOjE3Mjc0Mjg3MjQsImV4cCI6MTcyNzQyOTAyNCwiaWF0IjoxNzI3NDI4NzI0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjQ0LyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIn0.Uv_0zuAQ7NLJ5mI9S_BaPdLjNIL6RupCtpM5zUp9SmPqlGcTHDvgfJKsuXapNb7NFW9joHDcIevv0iPNuZSP5w',
      },
    };
    const body = data;
    return this.http.put<CustomerDto | undefined>(`${API_ENDPOINT}/Customers`, body, options)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('putCustomerDto', undefined)));
  }

  public postCustomerDto(data: any): Observable<CustomerDto | undefined> {
    if (!data) {
      return of(undefined);
    }
    const body = data;
    return this.http.post<CustomerDto | undefined>(`${API_ENDPOINT}/Customers`, body)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('postCustomerDto', undefined)));
  }
}
