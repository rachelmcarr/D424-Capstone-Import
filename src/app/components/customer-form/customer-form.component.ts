import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService, Customer } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent {
  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    driverLicense: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    customerPhoto: '',
    createdAt: '',
    updatedAt: ''
  };

  constructor(private customerService: CustomerService) {}

  onSubmit(form: NgForm) {
    const timestamp = new Date().toISOString();
    this.customer.createdAt = timestamp;
    this.customer.updatedAt = timestamp;

    this.customerService.add(this.customer).subscribe({
      next: () => {
        alert('Customer added successfully!');
        form.resetForm();
      },
      error: err => {
        console.error(err);
        alert('Failed to add customer.');
      }
    });
  }
}
