import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ParentalConsent } from '../../services/parental-consent.service';
import { Customer } from '../../services/customer.service';
import { ShopService } from '../../services/shop-service.service';

@Component({
  selector: 'app-parental-consent',
  templateUrl: './parental-consent.component.html'
})
export class ParentalConsentComponent implements OnInit {
  @Input() customer!: Customer;
  @Input() selectedService!: ShopService;
  @Output() consentFilled = new EventEmitter<ParentalConsent>();

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
    dateSigned: '',
    customer: {} as Customer,
    service: {} as ShopService
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
      console.error("ParentalConsentComponent is missing selectedService input!");
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

    console.log("ParentalConsent finalized:", this.consent);
    this.consentFilled.emit(this.consent);
  }
}
