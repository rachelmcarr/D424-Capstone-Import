import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PiercingConsent } from '../../services/piercing-consent.service';
import { Customer } from '../../services/customer.service';
import { ShopService } from '../../services/shop-service.service';

@Component({
  selector: 'app-piercing-consent',
  templateUrl: './piercing-consent.component.html'
})
export class PiercingConsentComponent implements OnInit {
  @Input() customer!: Customer;
  @Input() selectedService!: ShopService;
  @Output() consentFilled = new EventEmitter<PiercingConsent>();

  consent: PiercingConsent = {
    intakeID: 0,
    customerID: 0,
    shopServiceID: 0,
    customer: {} as Customer,
    service: {} as ShopService,
    understandsHealingProcess: false,
    agreesToAftercare: false,
    consentsToPiercing: false,
    dateSigned: ''
  };

  ngOnInit() {
    if (this.customer) {
      this.consent.customerID = this.customer.customerID!;
      this.consent.customer = this.customer;
    }

    if (this.selectedService) {
      this.consent.shopServiceID = this.selectedService.serviceID!;
      this.consent.service = this.selectedService;
    } else {
      console.error("PiercingConsentComponent is missing selectedService input!");
    }
  }

  finalizeConsent() {
    if (!this.selectedService?.serviceID) {
      console.error("Cannot finalize consent: invalid shopServiceID.");
      return;
    }

    this.consent.dateSigned = new Date().toISOString();
    this.consent.customer = this.customer;
    this.consent.service = this.selectedService;

    console.log("PiercingConsent finalized:", this.consent);
    this.consentFilled.emit(this.consent);
  }
}
