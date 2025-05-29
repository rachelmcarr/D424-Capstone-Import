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

  @Output() consentFilled = new EventEmitter<PiercingConsent>();

  finalizeConsent() {
  this.consent.customerID = this.customerID;
  this.consent.dateSigned = new Date().toISOString();
  this.consentFilled.emit(this.consent);
}

  consent: PiercingConsent = {
    intakeID: 0,
    customerID: 0,
    understandsHealingProcess: false,
    agreesToAftercare: false,
    consentsToPiercing: false,
    dateSigned: ''
  };

  constructor(
    private piercingConsentService: PiercingConsentService,
    private customerService: CustomerService
  ) {}

  done() {
  this.consent.customerID = this.customerID;
  this.consent.dateSigned = new Date().toISOString();
  console.log("PiercingConsent done:", this.consent);

  // Instead of submitting to backend directly, just emit the filled consent
  this.consentFilled.emit(this.consent);
}
}