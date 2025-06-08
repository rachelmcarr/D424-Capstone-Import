import { Component, OnInit } from '@angular/core';
import { ArtistService, Artist } from '../../../services/artist.service';

@Component({
  selector: 'app-public-artists',
  templateUrl: './public-artists.component.html',
 styleUrls: ['../../../../styles/public-theme.css']
})
export class PublicArtistsComponent implements OnInit {
  artists: Artist[] = [];

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artistService.getAll().subscribe({
      next: (data) => this.artists = data,
      error: (err) => console.error('Failed to fetch artists', err)
    });
  }
}
