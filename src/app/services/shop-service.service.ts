import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from './artist.service';

export interface ShopService {
  serviceID?: number;
  title: string;
  description: string;
  location: string;
  style: string;
  duration: string;
  status: string;
  price: number;
  imageURL: string;
  category: string;
  createdAt: string;
  inkInfo: string;
  jewelryInfo: string;
  completedPhotoURL?: string;
  artistID?: number;
  artist?: Artist; 
}

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {
  private apiUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) {}

  /** Get all services */
  getAll(): Observable<ShopService[]> {
    return this.http.get<ShopService[]>(this.apiUrl);
  }

  getByCustomer(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/shop-services/customer/${customerId}`);
  }

  /** Get a service by ID */
  getById(serviceID: number): Observable<ShopService> {
    return this.http.get<ShopService>(`${this.apiUrl}/${serviceID}`);
  }

  /** Add a new service */
  add(service: ShopService): Observable<ShopService> {
    return this.http.post<ShopService>(this.apiUrl, service);
  }

  /** Update an existing service */
  update(service: ShopService): Observable<ShopService> {
    return this.http.put<ShopService>(`${this.apiUrl}/${service.serviceID}`, service);
  }

  /** Delete a service */
  delete(serviceID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${serviceID}`);
  }

  assignCustomer(serviceId: number, customerId: number) {
  return this.http.put(`http://localhost:8080/api/services/${serviceId}/assign-customer/${customerId}`, {});
}

}
