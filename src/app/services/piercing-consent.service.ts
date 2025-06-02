import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PiercingConsent {
  piercingConsentID?: number;
  customerID: number;
  shopServiceID: number;
  intakeID: number;
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

  getByCustomerId(customerId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/piercing-consents/customer/${customerId}`);
  }

  submitConsent(consent: PiercingConsent): Observable<PiercingConsent> {
    return this.http.post<PiercingConsent>(this.apiUrl, consent);
  }
}