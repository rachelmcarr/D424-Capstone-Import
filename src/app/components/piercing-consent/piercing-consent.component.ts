import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PiercingConsentService, PiercingConsent } from '../../services/piercing-consent.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-piercing-consent',
  templateUrl: './piercing-consent.component.html'
})
export class PiercingConsentComponent {
  @Input() customerID!: number;
  @Input() shopServiceID!: number;
  @Output() consentFilled = new EventEmitter<PiercingConsent>();

  consent: PiercingConsent = {
    intakeID: 0,
    customerID: 0,
    shopServiceID: 0,
    understandsHealingProcess: false,
    agreesToAftercare: false,
    consentsToPiercing: false,
    dateSigned: ''
  };

  ngOnInit() {
    if (this.customerID) {
      this.consent.customerID = this.customerID;
    }

    if (this.shopServiceID) {
      this.consent.shopServiceID = this.shopServiceID;
    } else {
      console.error("PiercingConsentComponent is missing shopServiceID input!");
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
    console.log("PiercingConsent finalized:", this.consent);
    this.consentFilled.emit(this.consent);
  }
}
