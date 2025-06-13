import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShopService, ShopServiceService } from '../../../services/shop-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist, ArtistService } from '../../../services/artist.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-shop-service-form',
  templateUrl: './shop-service-form.component.html',
  styleUrls: ['../../../../styles/staff-theme.css']
})

export class ShopServiceFormComponent {

  @Output() serviceCreated = new EventEmitter<ShopService>();
  @Input() customerID!: number;
  @Input() showNav: boolean = true;
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
    createdAt: '',
    inkInfo: '',
    jewelryInfo: '',
    artistID: undefined,
  };

  artists: Artist[] = [];

  constructor(
    private serviceService: ShopServiceService,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.artistService.getAll().subscribe({
      next: (artists) => (this.artists = artists),
      error: (err) => console.error('Failed to load artists', err)
    });
  }

  onSubmit(form?: NgForm) {
    this.service.createdAt = this.datePipe.transform(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss')!;
    if (this.customerID) {
      this.service.customer = { customerID: this.customerID } as any;
    }

    if (this.service.artistID) {
      this.service.artist = { artistID: this.service.artistID } as Artist;
      delete this.service.artistID; // optional but cleaner
    }

    if (form) {
      console.log(JSON.stringify(form.value));
    }

    console.log('Submitting service:', JSON.stringify(this.service));

    this.serviceService.add(this.service).subscribe({
      next: (newService) => {
        this.serviceCreated.emit(newService);
        form?.resetForm();
        this.router.navigate(['/services']);
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
