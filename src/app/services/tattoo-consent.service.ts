import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TattooConsent {
  intakeID: number;
  customerID: number;
  drugsOrAlcohol: boolean;
  skinCondition: boolean;
  approveDesign: boolean;
  isNotPregnant: boolean;
  hasDisease: boolean;
  isMinor: boolean;
  understandsAllergyRisk: boolean;
  undertandsInfectionRisk: boolean;
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
}

@Injectable({
  providedIn: 'root'
})
export class TattooConsentService {
  private apiUrl = 'http://localhost:8080/api/tattoo-consents';

  constructor(private http: HttpClient) {}

  getByCustomerId(customerId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/tattoo-consents/customer/${customerId}`);
  }

  submitConsent(consent: TattooConsent): Observable<TattooConsent> {
    return this.http.post<TattooConsent>(this.apiUrl, consent);
  }
}
