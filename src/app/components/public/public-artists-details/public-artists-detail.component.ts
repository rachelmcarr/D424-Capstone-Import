import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService, Artist } from '../../../services/artist.service';

@Component({
  selector: 'app-public-artists-detail',
  templateUrl: './public-artists-detail.component.html',
  styleUrls: ['../../../../styles/public-theme.css']
})
export class PublicArtistsDetailComponent implements OnInit {
  artistId: number = 0;
  artist?: Artist;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const idParam = params.get('id');
    if (idParam) {
      this.artistId = +idParam;
      this.loadArtist(this.artistId);
    }
  });
}

loadArtist(id: number): void {
  this.artistService.getById(id).subscribe({
    next: (data) => {
      this.artist = { ...data }; // clone to trigger change detection
    },
    error: (err) => {
      console.error('Failed to load artist:', err);
    }
  });
}
}  