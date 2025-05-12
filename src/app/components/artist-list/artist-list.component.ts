import { Component, OnInit } from '@angular/core';
import { ArtistService, Artist } from '../../services/artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html'
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];
  editingArtist: Artist | null = null;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artistService.getAll().subscribe({
      next: (data) => {
        this.artists = data;
        console.log('Loaded artists:', this.artists); // ✅ for debugging
      },
      error: (err) => console.error('Failed to load artists', err)
    });
  }
  
  deleteArtist(artistID: number): void {
    if (confirm('Are you sure you want to delete this artist?')) {
      this.artistService.delete(artistID).subscribe({
        next: () => {
          this.artists = this.artists.filter(a => a.artistID !== artistID);
        },
        error: (err: any) => console.error('Failed to delete artist', err)
      });
    }
  }

  editArtist(artist: Artist): void {
    this.editingArtist = { ...artist };
  }

  saveArtist(): void {
    if (this.editingArtist && this.editingArtist.artistID !== undefined) {
      this.artistService.update(this.editingArtist).subscribe({
        next: updated => {
          const index = this.artists.findIndex(a => a.artistID === updated.artistID);
          if (index !== -1) this.artists[index] = updated;
          this.editingArtist = null;
        },
        error: (err: any) => console.error('Failed to update artist', err)
      });
    }
  }

  cancelEdit(): void {
    this.editingArtist = null;
  }
}
