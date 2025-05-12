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

  medicalConditionsList: string[] = [
    'TB',
    'Epilepsy',
    'Blood Thinners',
    'Scarring/Keloiding',
    'HIV',
    'Asthma',
    'Eczema/Psoriasis',
    'Gonorrhea/Syphilis',
    'Hepatitis',
    'Heart Condition',
    'MSRA/Staph Infection',
    'Herpes',
    'Hemophilia/Other Bleeding Disorder',
    'Pregnant/Nursing',
    'Allergic Reactions to Latex',
    'Diabetes',
    'Skin Conditions',
    'Fainting or Dizziness',
    'Allergic Reaction to Antibiotics'
  ];
  
  selectedConditions: string[] = [];
  

  constructor(private intakeService: ClientIntakeService) {}

  onConditionChange(event: any) {
    const condition = event.target.value;
    if (event.target.checked) {
      this.selectedConditions.push(condition);
    } else {
      this.selectedConditions = this.selectedConditions.filter(c => c !== condition);
    }
  
    // Update the string to store in backend
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
