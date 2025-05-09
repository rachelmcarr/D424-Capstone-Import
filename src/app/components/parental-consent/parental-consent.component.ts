import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentalConsentService, ParentalConsent } from '../../services/parental-consent.service';

@Component({
  selector: 'app-parental-consent',
  templateUrl: './parental-consent.component.html'
})
export class ParentalConsentComponent {
  consent: ParentalConsent = {
    intakeID: 0,
    parentName: '',
    parentPhone: '',
    relationship: '',
    signature: '',
    dateSigned: ''
  };

  constructor(private consentService: ParentalConsentService) {}

  onSubmit(form: NgForm) {
    this.consent.dateSigned = new Date().toISOString();

    this.consentService.add(this.consent).subscribe({
      next: () => {
        alert('Parental consent submitted!');
        form.resetForm();
      },
      error: err => {
        console.error(err);
        alert('Failed to submit consent.');
      }
    });
  }
}
