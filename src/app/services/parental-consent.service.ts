import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer.service';
import { ShopService } from './shop-service.service';

export interface ParentalConsent {
  parentalConsentID?: number;
  intakeID: number;
  customerID: number;
  customer: Customer;
  shopServiceID: number;
  service: ShopService;
  releaseLiability: boolean;
  confirmRelationship: boolean;
  understandsHealing: boolean;
  serviceDescription: string;
  parentName: string;
  parentPhone: string;
  relationship: string;
  signature: string;
  dateSigned: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParentalConsentService {
  private apiUrl = 'http://localhost:8080/api/parental-consents';

  constructor(private http: HttpClient) {}

  /** Submit a new parental consent */
  submitConsent(consent: ParentalConsent): Observable<ParentalConsent> {
    return this.http.post<ParentalConsent>(this.apiUrl, consent);
  }

  /** Get consents by customer ID */
  getByCustomerId(customerId: number): Observable<ParentalConsent[]> {
    return this.http.get<ParentalConsent[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  /** (Optional) Get consent by ID */
  getById(id: number): Observable<ParentalConsent> {
    return this.http.get<ParentalConsent>(`${this.apiUrl}/${id}`);
  }

  /** (Optional) Delete a consent */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** (Optional) Get all parental consents */
  getAll(): Observable<ParentalConsent[]> {
    return this.http.get<ParentalConsent[]>(this.apiUrl);
  }
}
