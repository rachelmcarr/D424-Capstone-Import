import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentalConsentService, ParentalConsent } from '../../services/parental-consent.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-parental-consent',
  templateUrl: './parental-consent.component.html'
})
export class ParentalConsentComponent {
  @Input() customerID!: number;
  consent: ParentalConsent = {
    intakeID: 0,
    customerID: 0,
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

  constructor(
    private consentService: ParentalConsentService,
  private customerService: CustomerService
) {}

  @Output() consentFilled = new EventEmitter<any>();

  onSubmit(form: NgForm) {
    const customerID = this.customerService.getCustomerID();
    if (!customerID) {
      alert('No customer selected. Please complete customer info first.');
      return;
    }
    this.consent.customerID = this.customerID;
    this.consent.dateSigned = new Date().toISOString();
    console.log("ParentalConsent before submit:", this.consent);
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
