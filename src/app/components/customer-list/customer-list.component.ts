import { Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  editingCustomer: Customer | null = null;

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

  updateCustomer(): void {
    if (!this.editingCustomer?.customerID) return;

    this.customerService.update(this.editingCustomer).subscribe({
      next: () => {
        alert('Customer updated successfully.');
        this.editingCustomer = null;
        this.loadCustomers();
      },
      error: err => {
        console.error(err);
        alert('Failed to update customer.');
      }
    });
  }

  deleteCustomer(customerID: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.delete(customerID).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c.customerID !== customerID);
        },
        error: (err: any) => {
          console.error('Failed to delete customer', err);
        }
      });
    }
  }

  viewDetails(customer: any) {
    this.router.navigate(['/customers', customer.customerID]);
  }

  logout(): void {
    this.authService.logout();
  }

}
