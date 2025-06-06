import { Component, OnInit } from '@angular/core';
import { ShopServiceService, ShopService } from '../../services/shop-service.service';
import { ArtistService, Artist } from '../../services/artist.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shop-service-list',
  templateUrl: './shop-service-list.component.html'
})
export class ShopServiceListComponent implements OnInit {
  services: ShopService[] = [];
  editingService: ShopService | null = null;
  artists: Artist[] = [];
  selectedArtistID: number | null = null;

  constructor(
    private serviceService: ShopServiceService,
    private artistService: ArtistService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadArtists();
  }

  loadServices(): void {
    this.serviceService.getAll().subscribe({
      next: (data) => this.services = data,
      error: (err) => console.error('Failed to load services', err)
    });
  }

  editService(service: ShopService): void {
    this.editingService = { ...service };
    this.selectedArtistID = service.artistID ?? null;
  }

  cancelEdit(): void {
    this.editingService = null;
    this.selectedArtistID = null;
  }

  updateService(): void {
    if (!this.editingService?.serviceID) return;

    if (this.selectedArtistID) {
      // Set artist object with just the ID
      this.editingService.artist = { artistID: this.selectedArtistID } as Artist;
    }

    this.serviceService.update(this.editingService).subscribe({
      next: () => {
        alert('Service updated.');

        // Prompt to add to gallery
        if (this.editingService?.completedPhotoURL && this.selectedArtistID) {
          const confirmGallery = confirm('Add completed photo to artist gallery?');
          if (confirmGallery) {
            this.addToGallery(this.editingService.completedPhotoURL, this.selectedArtistID);
          }
        }

        this.editingService = null;
        this.selectedArtistID = null;
        this.loadServices();
      },
      error: (err) => {
        console.error('Failed to update service:', err);
        alert('An error occurred while updating the service.');
      }
    });
  }

  deleteService(serviceID: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.serviceService.delete(serviceID).subscribe({
        next: () => {
          this.services = this.services.filter(s => s.serviceID !== serviceID);
          alert('Service deleted.');
        },
        error: (err) => {
          console.error('Failed to delete service:', err);
          alert('An error occurred while deleting the service.');
        }
      });
    }
  }

  addToGallery(imageURL: string, artistId: number): void {
    this.artistService.addImageToGallery(artistId, imageURL).subscribe({
      next: () => alert('Image added to artist gallery.'),
      error: (err) => {
        console.error('Failed to add image to gallery:', err);
        alert('Failed to add image to artist gallery.');
      }
    });
  }

  loadArtists(): void {
    this.artistService.getAll().subscribe({
      next: (data) => this.artists = data,
      error: (err) => console.error('Failed to load artists', err)
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
