import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArtistService, Artist } from '../../../services/artist.service';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['../../../../styles/staff-theme.css']
})

export class ArtistFormComponent {

  @Input() showNav: boolean = true;

  artist: Artist = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    artistCategory: '',
    artistPhoto: '',
    bio: '',
    portfolioURL: '',
    gallery: []
  };

  constructor(private artistService: ArtistService,
    private router: Router
  ) {}

  addGalleryImage() {
    this.artist.gallery.push('');
  }

  removeGalleryImage(index: number) {
    this.artist.gallery.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    this.artistService.add(this.artist).subscribe({
      next: () => {
        alert('Artist added successfully!');
        form.resetForm();
        this.router.navigate(['/portal/artists']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add artist.');
      }
    });
  }
}
