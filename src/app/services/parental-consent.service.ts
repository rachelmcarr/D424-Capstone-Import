import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ParentalConsent {
  consentID?: number;
  intakeID: number;
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

  add(consent: ParentalConsent): Observable<ParentalConsent> {
    return this.http.post<ParentalConsent>(this.apiUrl, consent);
  }

  getAll(): Observable<ParentalConsent[]> {
    return this.http.get<ParentalConsent[]>(this.apiUrl);
  }
}
