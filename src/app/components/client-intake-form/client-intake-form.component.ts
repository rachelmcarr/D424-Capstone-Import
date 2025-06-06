import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientIntakeService, ClientIntake } from '../../services/client-intake.service';
import { ShopServiceService, ShopService } from '../../services/shop-service.service';
import { Customer } from '../../services/customer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-intake-form',
  templateUrl: './client-intake-form.component.html'
})
export class ClientIntakeFormComponent {
  intake: ClientIntake = {
    customer: {} as Customer,
    service: {} as ShopService,
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
    'Fainting or Dizziness', 'Allergic Reaction to Antibiotics', 'Other', 'None'
  ];

  constructor(
    private intakeService: ClientIntakeService,
    private shopServiceService: ShopServiceService,
    private datePipe: DatePipe
  ) {}

  // Replace number with full object
  onCustomerSelected(customer: Customer) {
    this.intake.customer = customer;
  }

  onServiceSelected(service: ShopService) {
    this.intake.service = service;

    if (this.intake.customer?.customerID && this.intake.service?.serviceID) {
      this.shopServiceService.assignCustomer(service.serviceID!, this.intake.customer.customerID).subscribe({
        next: () => console.log('Service associated with customer'),
        error: (err) => console.error('Failed to associate service:', err)
      });
    }
  }

  onServiceCreated(newService: ShopService) {
    this.intake.service = newService;
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
    this.intake.dateSubmitted = this.datePipe.transform(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss')!;

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
