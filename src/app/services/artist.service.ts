import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Artist {
  artistID?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  artistCategory: string;
  artistPhoto: string;
  bio: string;
  portfolioURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = 'http://localhost:8080/api/artists';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl);
  }

  add(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrl, artist);
  }
}
