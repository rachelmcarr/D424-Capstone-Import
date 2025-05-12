import { Component, Output, EventEmitter } from '@angular/core';
import { CustomerService, Customer } from '../../services/customer.service';

@Component({
  selector: 'app-customer-lookup',
  templateUrl: './customer-lookup.component.html'
})
export class CustomerLookupComponent {
  searchTerm: string = '';
  results: Customer[] = [];

  @Output() customerSelected = new EventEmitter<Customer>();

  constructor(private customerService: CustomerService) {}

  search() {
    if (!this.searchTerm.trim()) {
      this.results = [];
      return;
    }

    this.customerService.searchByName(this.searchTerm).subscribe({
      next: (data) => this.results = data,
      error: (err) => console.error('Search failed', err)
    });
  }

  selectCustomer(customer: Customer) {
    this.customerSelected.emit(customer);
  }
}
