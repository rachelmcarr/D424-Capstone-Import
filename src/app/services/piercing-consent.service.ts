import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PiercingConsent {
  piercingConsentID?: number;
  intakeID: number;
  customerID: number;
  serviceID: number;
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

  submitConsent(consent: PiercingConsent): Observable<PiercingConsent> {
      return this.http.post<PiercingConsent>(this.apiUrl, consent);
    }
  
    getByCustomerId(customerId: number): Observable<PiercingConsent[]> {
      return this.http.get<PiercingConsent[]>(`${this.apiUrl}/customer/${customerId}`);
    }
  
    getByServiceId(serviceId: number): Observable<PiercingConsent> {
      return this.http.get<PiercingConsent>(`${this.apiUrl}/service/${serviceId}`);
    }
  
    getAll(): Observable<PiercingConsent[]> {
      return this.http.get<PiercingConsent[]>(this.apiUrl);
    }
  }
