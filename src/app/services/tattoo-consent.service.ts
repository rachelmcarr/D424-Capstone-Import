import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TattooConsent {
  tattooConsentID?: number;
  intakeID: number;
  understandsPainRisk: boolean;
  agreesToAftercare: boolean;
  consentsToTattoo: boolean;
  dateSigned: string;
}

@Injectable({
  providedIn: 'root'
})
export class TattooConsentService {
  private apiUrl = 'http://localhost:8080/api/tattoo-consents';

  constructor(private http: HttpClient) {}

  add(consent: TattooConsent): Observable<TattooConsent> {
    return this.http.post<TattooConsent>(this.apiUrl, consent);
  }

  getAll(): Observable<TattooConsent[]> {
    return this.http.get<TattooConsent[]>(this.apiUrl);
  }
}
