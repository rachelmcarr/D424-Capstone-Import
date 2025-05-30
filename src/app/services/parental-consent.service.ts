import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ParentalConsent {
  consentID?: number;
  customerID: number;
  intakeID: number;
  releaseLiability: boolean,
  confirmRelationship: boolean,
  understandsHealing: boolean,
  serviceDescription: string,
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

  getByCustomerId(customerId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/parental-consents/customer/${customerId}`);
  }

  submitConsent(consent: ParentalConsent): Observable<ParentalConsent> {
    return this.http.post<ParentalConsent>(this.apiUrl, consent);
  }
}
