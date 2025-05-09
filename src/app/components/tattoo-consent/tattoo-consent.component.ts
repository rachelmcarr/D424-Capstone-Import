import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TattooConsentService, TattooConsent } from '../../services/tattoo-consent.service';

@Component({
  selector: 'app-tattoo-consent',
  templateUrl: './tattoo-consent.component.html'
})
export class TattooConsentComponent {
  consent: TattooConsent = {
    intakeID: 0,
    understandsPainRisk: false,
    agreesToAftercare: false,
    consentsToTattoo: false,
    dateSigned: ''
  };

  constructor(private tattooConsentService: TattooConsentService) {}

  onSubmit(form: NgForm) {
    this.consent.dateSigned = new Date().toISOString();

    this.tattooConsentService.add(this.consent).subscribe({
      next: () => {
        alert('Tattoo consent submitted!');
        form.resetForm();
      },
      error: err => {
        console.error(err);
        alert('Failed to submit tattoo consent.');
      }
    });
  }
}
