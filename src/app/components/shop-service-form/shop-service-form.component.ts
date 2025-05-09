import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShopServiceService, ShopService } from '../../services/shop-service.service';

@Component({
  selector: 'app-shop-service-form',
  templateUrl: './shop-service-form.component.html'
})
export class ShopServiceFormComponent {
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
    createdAt: ''
  };

  constructor(private serviceService: ShopServiceService) {}

  onSubmit(form: NgForm) {
    this.service.createdAt = new Date().toISOString();

    this.serviceService.add(this.service).subscribe({
      next: () => {
        alert('Service added!');
        form.resetForm();
      },
      error: err => {
        console.error(err);
        alert('Failed to save service.');
      }
    });
  }
}
