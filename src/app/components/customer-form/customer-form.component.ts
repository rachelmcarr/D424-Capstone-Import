import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer, CustomerService } from '../../services/customer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnChanges {
  @Input() existingCustomer?: Customer | null;
  @Input() showNav: boolean = true;
  @Input() isMinor: boolean = false;
  @Output() customerCreated = new EventEmitter<Customer>();
  @Output() customerUpdated = new EventEmitter<Customer>();

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

  constructor(private customerService: CustomerService,
    private datePipe: DatePipe
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['existingCustomer'] && this.existingCustomer) {
      this.customer = { ...this.existingCustomer };
    }
  }

  onSubmit(form: NgForm) {
    const timestamp = this.datePipe.transform(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss')!;
    this.customer.updatedAt = timestamp;
    if (this.existingCustomer?.customerID) {
      this.customerService.update(this.customer).subscribe({
        next: (updated) => {
          this.customerService.setCustomer(updated); // ✅ store for wizard
          alert('Customer updated!');
          this.customerUpdated.emit(updated);
        },
        error: err => {
          console.error(err);
          alert('Failed to update customer.');
        }
      });
    } else {
      this.customer.createdAt = timestamp;
      this.customerService.add(this.customer).subscribe({
        next: (newCustomer) => {
          this.customerService.setCustomer(newCustomer); // ✅ store for wizard
          alert('Customer created!');
          this.customerCreated.emit(newCustomer);
          form.resetForm();
        },
        error: err => {
          console.error(err);
          alert('Failed to create customer.');
        }
      });
    }
  }  
}
