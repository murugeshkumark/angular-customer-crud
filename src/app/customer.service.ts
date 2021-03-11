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
    return this.http.get(this.customerUrl);
    // return null;
  }

  // GET Customer by id. Will 404 if id not found
  getCustomer(customerId: number): Observable<Customer> {

    return null;
  }

  // POST: add a new customer to the server
  addNewCustomer(newCustomer: Customer): Observable<any> {

    return null;
  }

  // PUT: update the customer on the server
  updateCustomer(customerDetail: Customer): Observable<any> {

    return null;
  }

  // DELETE: delete the customer from the server
  deleteCustomer(customerId: number): Observable<any> {

    return null;
  }
}
