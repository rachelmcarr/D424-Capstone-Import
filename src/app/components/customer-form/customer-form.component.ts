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

  states: string[] = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  constructor(private customerService: CustomerService,
    private datePipe: DatePipe
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['existingCustomer'] && this.existingCustomer) {
      this.customer = { ...this.existingCustomer };
    }
  }

  checkIfMinor(birthDate: string | Date): boolean {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    return (
      age < 18 ||
      (age === 18 && monthDiff < 0) ||
      (age === 18 && monthDiff === 0 && dayDiff < 0)
    );
  }

  onBirthDateChange(date: string) {
    this.customer.birthDate = date;
    this.isMinor = this.checkIfMinor(date);
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
