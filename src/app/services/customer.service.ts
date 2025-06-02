import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
  customerID?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  driverLicense: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  customerPhoto: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customers';

  // ✅ NEW: Holds the currently selected customer
  private currentCustomer: Customer | null = null;

  constructor(private http: HttpClient) {}

  // ✅ NEW: Set and get methods
  setCustomer(customer: Customer | null) {
    this.currentCustomer = customer;
    console.log('Current customer set to:', customer);
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  getCustomer(): Customer | null {
    return this.currentCustomer;
  }

  getCustomerID(): number | null {
    return this.currentCustomer?.customerID ?? null;
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  add(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  update(customer: Customer): Observable<Customer> {
    if (customer.customerID == null) {
      throw new Error('Cannot update customer without an ID');
    }
    return this.http.put<Customer>(`${this.apiUrl}/${customer.customerID}`, customer);
  }


  delete(customerID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${customerID}`);
  }

  searchByName(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/search?name=${encodeURIComponent(name)}`);
  }
}
