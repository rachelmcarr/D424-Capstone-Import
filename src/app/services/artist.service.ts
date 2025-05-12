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
  gallery: string[];
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

  getById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/${id}`);
  }

  add(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrl, artist);
  }

  update(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiUrl}/${artist.artistID}`, artist);
  }

  delete(artistID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${artistID}`);
  }
}
