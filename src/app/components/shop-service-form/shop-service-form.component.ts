import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShopServiceService, ShopService } from '../../services/shop-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService, Artist } from '../../services/artist.service';

@Component({
  selector: 'app-shop-service-form',
  templateUrl: './shop-service-form.component.html'
})

export class ShopServiceFormComponent {

  @Output() serviceCreated = new EventEmitter<ShopService>();
  @Input() customerID!: number;

  @ViewChild('serviceForm') serviceForm!: NgForm;

  service: ShopService = {
    title: '',
    description: '',
    location: '',
    style: '',
    duration: '',
    status: '',
    price: 0,
    imageURL: '',
    category: '',
    createdAt: new Date().toISOString(),
    inkInfo: '',
    jewelryInfo: '',
    artistID: undefined,
  };

  artists: Artist[] = [];

  constructor(
    private serviceService: ShopServiceService,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.artistService.getAll().subscribe({
      next: (artists) => (this.artists = artists),
      error: (err) => console.error('Failed to load artists', err)
    });
  }

  onSubmit(form?: NgForm) {
    this.service.createdAt = new Date().toISOString();
    if (this.customerID) {
      this.service.customer = { customerID: this.customerID };
    }

    this.serviceService.add(this.service).subscribe({
      next: (newService) => {
        this.serviceCreated.emit(newService); // ✅ emit to wizard
        form?.resetForm();
      },
      error: err => {
        console.error(err);
        alert('Failed to save service.');
      }
    });
  }

  public triggerSubmit() {
    this.onSubmit();
  }
}
