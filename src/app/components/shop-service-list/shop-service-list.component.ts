import { Component, OnInit } from '@angular/core';
import { ShopServiceService, ShopService } from '../../services/shop-service.service';

@Component({
  selector: 'app-shop-service-list',
  templateUrl: './shop-service-list.component.html'
})
export class ShopServiceListComponent implements OnInit {
  services: ShopService[] = [];
  editingService: ShopService | null = null;

  constructor(private serviceService: ShopServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getAll().subscribe({
      next: (data) => this.services = data,
      error: (err) => console.error('Failed to load services', err)
    });
  }

  editService(service: ShopService): void {
    this.editingService = { ...service };
  }

  cancelEdit(): void {
    this.editingService = null;
  }

  updateService(): void {
    if (!this.editingService?.serviceID) return;

    this.serviceService.update(this.editingService).subscribe({
      next: () => {
        alert('Service updated.');
        this.editingService = null;
        this.loadServices();
      },
      error: (err: any) => {
        console.error('Failed to update service:', err);
        alert('An error occurred while updating the service.');
      }
    });
  }

  deleteService(serviceID: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.serviceService.delete(serviceID).subscribe({
        next: () => {
          this.services = this.services.filter(s => s.serviceID !== serviceID);
          alert('Service deleted.');
        },
        error: (err) => {
          console.error('Failed to delete service:', err);
          alert('An error occurred while deleting the service.');
        }
      });
    }
  }
}
