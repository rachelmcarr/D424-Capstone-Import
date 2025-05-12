import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService, Artist } from '../../services/artist.service';

@Component({
  selector: 'app-public-artists-detail',
  templateUrl: './public-artists-detail.component.html',
  styleUrls: ['./public-artists-detail.component.css']
})
export class PublicArtistsDetailComponent implements OnInit {
  artistId: number = 0;
  artist?: Artist;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.artistId = +idParam;
      this.artistService.getById(this.artistId).subscribe({
        next: (data) => this.artist = data,
        error: (err) => console.error('Failed to load artist', err)
      });
    }
  }
}
