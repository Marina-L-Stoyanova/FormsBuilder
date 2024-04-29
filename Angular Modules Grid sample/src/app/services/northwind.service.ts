import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../master-view/master-view.component';
import { CustomerPayload } from '../models/customer-interface';

@Injectable({
  providedIn: 'root'
})
export class NorthwindService {
  // Update the URL if needed -> https://github.com/IgniteUI/NorthwindAPI
  private apiUrl = 'https://localhost:7244/customers';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addCustomer(customerPayload: CustomerPayload): Observable<Customer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Generate token following this README -> https://github.com/IgniteUI/NorthwindAPI
      'Authorization': 'Bearer ' + ''
    });

    return this.http.post<Customer>(this.apiUrl, customerPayload, { headers });
  }

  updateCustomer(customerPayload: CustomerPayload): Observable<Customer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Generate token following this README -> https://github.com/IgniteUI/NorthwindAPI
      'Authorization': 'Bearer ' + ''
    });

    return this.http.put<Customer>(this.apiUrl, customerPayload, { headers });
  }

  deleteCustomer(cusotmerId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Generate token following this README -> https://github.com/IgniteUI/NorthwindAPI
      'Authorization': 'Bearer ' + ''
    });

    return this.http.delete<string>(this.apiUrl + '/' + cusotmerId, { headers });
  }
}


