import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // <-- Make sure this is imported
import { Customer, CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['../../../../styles/staff-theme.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  editingCustomer: Customer | null = null;

  states: string[] = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Failed to load customers', err)
    });
  }

  editCustomer(customer: Customer): void {
    this.editingCustomer = { ...customer };
  }

  cancelEdit(): void {
    this.editingCustomer = null;
  }

  updateCustomer(form: NgForm): void {
    if (!this.editingCustomer) return;

    // Directly send the model — updatedAt is handled in the backend if needed
    this.customerService.update(this.editingCustomer).subscribe({
      next: updated => {
        const index = this.customers.findIndex(c => c.customerID === updated.customerID);
        if (index !== -1) this.customers[index] = updated;
        this.cancelEdit();
      },
      error: err => {
        console.error('Failed to update customer:', err);
        alert('Update failed. See console for details.');
      }
    });
  }

  deleteCustomer(customerID: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.delete(customerID).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c.customerID !== customerID);
          alert('Customer deleted.');
        },
        error: (err) => {
          console.error('Failed to delete customer', err);
        }
      });
    }
  }

  viewDetails(customer: Customer): void {
    this.router.navigate(['/customers', customer.customerID]);
  }

  logout(): void {
    this.authService.logout();
  }
}
