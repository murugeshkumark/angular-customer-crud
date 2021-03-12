import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  private customerUrl = 'api/customers';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  // GET Customers from the server
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl);
    }

  // GET Customer by id. Will 404 if id not found
  getCustomer(customerId: number): Observable<Customer> {
    const url = `${this.customerUrl}/${customerId}`;
    return this.http.get<Customer>(url);
  }

  // POST: add a new customer to the server
  addNewCustomer(newCustomer: Customer): Observable<any> {
    const hero = { name };
    return this.http.post<Customer>(this.customerUrl, hero, this.httpOptions);
  }

  // PUT: update the customer on the server
  updateCustomer(customerDetail: Customer): Observable<any> {
    return this.http.put<Customer>(this.customerUrl, customerDetail, this.httpOptions);
  }

  // DELETE: delete the customer from the server
  deleteCustomer(customerId: number): Observable<any> {
    const url = `${this.customerUrl}/${customerId}`;
    return this.http.delete<Customer>(url, this.httpOptions);
  }

}
