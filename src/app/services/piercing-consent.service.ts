import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopService } from './shop-service.service';
import { Customer } from './customer.service';

export interface PiercingConsent {
  piercingConsentID?: number;
  intakeID: number;
  customerID: number;
  customer: Customer;
  shopServiceID: number;
  service: ShopService;
  understandsHealingProcess: boolean;
  agreesToAftercare: boolean;
  consentsToPiercing: boolean;
  dateSigned: string;
}

@Injectable({
  providedIn: 'root'
})
export class PiercingConsentService {
  private apiUrl = 'http://localhost:8080/api/piercing-consents';

  constructor(private http: HttpClient) {}

  /** Submit a piercing consent */
  submitConsent(consent: PiercingConsent): Observable<PiercingConsent> {
    return this.http.post<PiercingConsent>(this.apiUrl, consent);
  }

  /** Get all consents by customer ID */
  getByCustomerId(customerId: number): Observable<PiercingConsent[]> {
    return this.http.get<PiercingConsent[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  /** Optionally: Get consent by service ID */
  getByServiceId(serviceId: number): Observable<PiercingConsent> {
    return this.http.get<PiercingConsent>(`${this.apiUrl}/service/${serviceId}`);
  }

  /** Optionally: Get all consents (admin/debugging) */
  getAll(): Observable<PiercingConsent[]> {
    return this.http.get<PiercingConsent[]>(this.apiUrl);
  }
}
