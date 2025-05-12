import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PiercingConsentService, PiercingConsent } from '../../services/piercing-consent.service';

@Component({
  selector: 'app-piercing-consent',
  templateUrl: './piercing-consent.component.html'
})
export class PiercingConsentComponent {
  consent: PiercingConsent = {
    intakeID: 0,
    understandsHealingProcess: false,
    agreesToAftercare: false,
    consentsToPiercing: false,
    dateSigned: ''
  };

  constructor(private piercingConsentService: PiercingConsentService) {}

  onSubmit(form: NgForm) {
    this.consent.dateSigned = new Date().toISOString();

    this.piercingConsentService.submitConsent(this.consent).subscribe({
      next: () => {
        alert('Piercing consent submitted!');
        form.resetForm();
      },
      error: (err: any) => {
        console.error(err);
        alert('Failed to submit piercing consent.');
      }
    });
  }
}
