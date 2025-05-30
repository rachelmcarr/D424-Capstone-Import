import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientIntakeService, ClientIntake } from '../../services/client-intake.service';
import { ShopServiceService } from '../../services/shop-service.service';

@Component({
  selector: 'app-client-intake-form',
  templateUrl: './client-intake-form.component.html'
})
export class ClientIntakeFormComponent {
  intake: ClientIntake = {
    customer: { customerID: 0 },
    serviceID: 0,
    dateSubmitted: '',
    hasAllergies: false,
    allergyDetails: '',
    takesMedications: false,
    medicationDetails: '',
    hasMedicalConditions: false,
    conditionDetails: '',
    isMinor: false
  };

  selectedConditions: string[] = [];

  medicalConditionsList: string[] = [
    'TB', 'Epilepsy', 'Blood Thinners', 'Scarring/Keloiding',
    'HIV', 'Asthma', 'Eczema/Psoriasis', 'Gonorrhea/Syphilis',
    'Hepatitis', 'Heart Condition', 'MSRA/Staph Infection', 'Herpes',
    'Hemophilia/Other Bleeding Disorder', 'Pregnant/Nursing',
    'Allergic Reactions to Latex', 'Diabetes', 'Skin Conditions',
    'Fainting or Dizziness', 'Allergic Reaction to Antibiotics'
  ];

  constructor(
    private intakeService: ClientIntakeService,
    private shopServiceService: ShopServiceService
  ) {}

  // Call this when customer is selected (e.g., step 1 of wizard)
  onCustomerSelected(customerId: number) {
    this.intake.customer = { customerID: customerId };
  }

  // Call this when an existing service is selected
  onServiceSelected(serviceId: number) {
    this.intake.serviceID = serviceId;

    // Optionally associate the service with the customer in backend
    if (this.intake.customer) {
      this.shopServiceService.assignCustomer(serviceId, this.intake.customer.customerID).subscribe({
        next: () => console.log('Service associated with customer'),
        error: (err: any) => console.error('Failed to associate service:', err)
      });
    }
  }

  // Call this when a new service is created
  onServiceCreated(newService: any) {
    this.intake.serviceID = newService.serviceID;
  }

  onConditionChange(event: any) {
    const condition = event.target.value;
    if (event.target.checked) {
      this.selectedConditions.push(condition);
    } else {
      this.selectedConditions = this.selectedConditions.filter(c => c !== condition);
    }

    this.intake.conditionDetails = this.selectedConditions.join(', ');
  }

  onSubmit(form: NgForm) {
    this.intake.dateSubmitted = new Date().toISOString();

    this.intakeService.add(this.intake).subscribe({
      next: () => {
        alert('Client intake submitted!');
        form.resetForm();
      },
      error: err => {
        console.error(err);
        alert('Failed to submit intake.');
      }
    });
  }
}
