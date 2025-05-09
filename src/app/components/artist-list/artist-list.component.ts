import { Component, OnInit } from '@angular/core';
import { ArtistService, Artist } from '../../services/artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html'
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artistService.getAll().subscribe(data => {
      this.artists = data;
    });
  }
}
