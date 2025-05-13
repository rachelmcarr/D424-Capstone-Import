import { Component, OnInit } from '@angular/core';
import { ArtistService, Artist } from '../../services/artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];
  editingArtist: Artist | null = null;

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.loadArtists();
  }

  loadArtists(): void {
    this.artistService.getAll().subscribe({
      next: (data) => this.artists = data,
      error: (err) => console.error('Failed to load artists', err)
    });
  }

  editArtist(artist: Artist): void {
    this.editingArtist = { ...artist };
  }

  cancelEdit(): void {
    this.editingArtist = null;
  }

  saveArtist(): void {
    if (!this.editingArtist?.artistID) return;

    this.artistService.update(this.editingArtist).subscribe({
      next: updated => {
        const index = this.artists.findIndex(a => a.artistID === updated.artistID);
        if (index !== -1) this.artists[index] = updated;
        this.editingArtist = null;
        alert('Artist updated.');
      },
      error: err => {
        console.error('Failed to update artist', err);
        alert('Error updating artist.');
      }
    });
  }

  deleteArtist(artistID: number): void {
    if (confirm('Are you sure you want to delete this artist?')) {
      this.artistService.delete(artistID).subscribe({
        next: () => {
          this.artists = this.artists.filter(a => a.artistID !== artistID);
          alert('Artist deleted.');
        },
        error: err => {
          console.error('Failed to delete artist', err);
          alert('Error deleting artist.');
        }
      });
    }
  }
}
