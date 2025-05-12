import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentalConsentService, ParentalConsent } from '../../services/parental-consent.service';

@Component({
  selector: 'app-parental-consent',
  templateUrl: './parental-consent.component.html'
})
export class ParentalConsentComponent {
  consent: ParentalConsent = {
    intakeID: 0,
    releaseLiability: false,
    confirmRelationship: false,
    understandsHealing: false,
    serviceDescription: '',
    parentName: '',
    parentPhone: '',
    relationship: '',
    signature: '',
    dateSigned: ''
  };

  constructor(private consentService: ParentalConsentService) {}

  @Output() consentFilled = new EventEmitter<any>();

  onSubmit(form: NgForm) {
    this.consent.dateSigned = new Date().toISOString();
    this.consentService.submitConsent(this.consent)
.subscribe({
      next: () => {
        this.consentFilled.emit(this.consent); // ✅ emits consent to parent
        alert('Parental consent submitted!');
        form.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to submit parental consent.');
      }
    });
  }
}  
