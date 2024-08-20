import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerPayload } from '../models/customer-interface';

@Injectable({
  providedIn: 'root'
})
export class NorthwindService {
  private readonly apiUrl = 'https://localhost:7244/customers';
  private readonly authToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjY5YTZkM2Q5LTJjN2QtNDFlNi1hYmE2LTU5ZmUxMzU0YzAzNCIsInN1YiI6Inprb2xldkBpbmZyYWdpc3RpY3MuY29tIiwiZW1haWwiOiJ6a29sZXZAaW5mcmFnaXN0aWNzLmNvbSIsImp0aSI6IjJkMmJlYTZkLTFjZTgtNGIyYy05MTVjLTdmYjJiOWY5ZDRlOCIsIm5iZiI6MTcxNzczOTcwOSwiZXhwIjoxNzE3NzQwMDA5LCJpYXQiOjE3MTc3Mzk3MDksImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNDQvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI0NC8ifQ.VUgX96H1HKXIPvAjPjIGx4oab7v9ODtu6tuC6RXyHB371OXH1W0u_-dQ5gHqb0sb33LbQtsKZT8_Dw2-CjhyNg';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addCustomer(customerPayload: CustomerPayload): Observable<CustomerPayload> {
    const headers = this.getHeaders();
    return this.http.post<CustomerPayload>(this.apiUrl, customerPayload, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateCustomer(customerPayload: CustomerPayload): Observable<CustomerPayload> {
    const headers = this.getHeaders();
    return this.http.put<CustomerPayload>(this.apiUrl, customerPayload, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteCustomer(customerId: string): Observable<string> {
    const headers = this.getHeaders();
    return this.http.delete<string>(`${this.apiUrl}/${customerId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
