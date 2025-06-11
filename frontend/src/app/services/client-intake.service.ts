import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer.service';
import { ShopService } from './shop-service.service';

export interface ClientIntake {
  intakeID?: number;
  customer: Customer;
  service: ShopService;
  dateSubmitted: string;
  hasAllergies: boolean;
  allergyDetails: string;
  takesMedications: boolean;
  medicationDetails: string;
  hasMedicalConditions: boolean;
  conditionDetails: string;
  isMinor: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ClientIntakeService {
  private apiUrl = 'http://localhost:8080/api/client-intakes';

  constructor(private http: HttpClient) {}

  add(intake: ClientIntake): Observable<ClientIntake> {
    return this.http.post<ClientIntake>(this.apiUrl, intake);
  }

  getAll(): Observable<ClientIntake[]> {
    return this.http.get<ClientIntake[]>(this.apiUrl);
  }

  getByCustomerId(customerId: number): Observable<ClientIntake[]> {
    return this.http.get<ClientIntake[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  submitIntake(intake: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/client-intakes', intake);
  }
  
}
