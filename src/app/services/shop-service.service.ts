import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {
  private apiUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ShopService[]> {
    return this.http.get<ShopService[]>(this.apiUrl);
  }

  add(service: ShopService): Observable<ShopService> {
    return this.http.post<ShopService>(this.apiUrl, service);
  }
}
