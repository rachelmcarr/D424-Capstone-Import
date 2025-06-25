import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TattooConsent {
  intakeID: number;
  customerID: number;
  serviceID: number;
  drugsOrAlcohol: boolean;
  skinCondition: boolean;
  approveDesign: boolean;
  notPregnant: boolean;
  hasDisease: boolean;
  minor: boolean;
  understandsAllergyRisk: boolean;
  understandsInfectionRisk: boolean;
  receiptOfAftercare: boolean;
  understandsVariation: boolean;
  understandsPermanence: boolean;
  understandsChoice: boolean;
  releaseArtist: boolean;
  understandsFDA: boolean;
  understandsMedicalRisk: boolean;
  agreesToAftercare: boolean;
  consentsToTattoo: boolean;
  dateSigned: string;
  tattooConsentID?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TattooConsentService {
  private apiUrl = 'https://rare-oddities-backend-production.up.railway.app/api/tattoo-consents';

  constructor(private http: HttpClient) {}

  submitConsent(consent: TattooConsent): Observable<TattooConsent> {
    return this.http.post<TattooConsent>(this.apiUrl, consent);
  }

  getByCustomerId(customerId: number): Observable<TattooConsent[]> {
    return this.http.get<TattooConsent[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  getByServiceId(serviceId: number): Observable<TattooConsent> {
    return this.http.get<TattooConsent>(`${this.apiUrl}/service/${serviceId}`);
  }

  getAll(): Observable<TattooConsent[]> {
    return this.http.get<TattooConsent[]>(this.apiUrl);
  }
}
