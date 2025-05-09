import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientIntakeService, ClientIntake } from '../../services/client-intake.service';

@Component({
  selector: 'app-client-intake-form',
  templateUrl: './client-intake-form.component.html'
})
export class ClientIntakeFormComponent {
  intake: ClientIntake = {
    customerID: 0,
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

  constructor(private intakeService: ClientIntakeService) {}

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
