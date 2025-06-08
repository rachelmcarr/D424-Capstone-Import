import { Component, Output, EventEmitter } from '@angular/core';
import { Customer, CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-lookup',
  templateUrl: './customer-lookup.component.html',
  styleUrls: ['../../../../styles/staff-theme.css']
})
export class CustomerLookupComponent {
  searchTerm: string = '';
  matchingCustomers: Customer[] = [];
  hoveredCustomer: number | null | undefined = null;

  @Output() customerSelected = new EventEmitter<Customer>();

  constructor(private customerService: CustomerService) {}

  search(): void {
    const trimmed = this.searchTerm.trim();
    if (!trimmed) {
      this.matchingCustomers = [];
      return;
    }

    this.customerService.searchByName(trimmed).subscribe({
      next: (data: Customer[]) => {
        this.matchingCustomers = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('Error searching for customers:', err);
        this.matchingCustomers = [];
      }
    });
  }

  selectCustomer(customer: Customer): void {
    this.customerSelected.emit(customer);
  }
}
