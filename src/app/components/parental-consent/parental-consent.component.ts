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
  @Input() shopServiceID!: number;
  @Output() consentFilled = new EventEmitter<any>();

  consent: ParentalConsent = {
    intakeID: 0,
    customerID: 0,
    shopServiceID: 0,
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

  ngOnInit() {
    if (this.customerID) {
      this.consent.customerID = this.customerID;
    }

    if (this.shopServiceID) {
      this.consent.shopServiceID = this.shopServiceID;
    } else {
      console.error("ParentalConsentComponent is missing shopServiceID input!");
    }
  }


  finalizeConsent() {
    this.consent.customerID = this.customerID;
    this.consent.shopServiceID = this.shopServiceID;

    if (!this.consent.shopServiceID || this.consent.shopServiceID === 0) {
      console.error("Cannot finalize consent: invalid shopServiceID.");
      return;
    }

    this.consent.dateSigned = new Date().toISOString();
    console.log("ParentalConsent finalized:", this.consent);
    this.consentFilled.emit(this.consent);
  }

}
