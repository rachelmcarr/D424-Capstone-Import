import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TattooConsent } from '../../services/tattoo-consent.service';
import { Customer } from '../../services/customer.service';
import { ShopService } from '../../services/shop-service.service';

@Component({
  selector: 'app-tattoo-consent',
  templateUrl: './tattoo-consent.component.html'
})
export class TattooConsentComponent implements OnInit {
  @Input() customer!: Customer;
  @Input() selectedService!: ShopService;
  @Output() consentFilled = new EventEmitter<TattooConsent>();

  consent: TattooConsent = {
    intakeID: 0,
    customerID: 0,
    shopServiceID: 0,
    customer: {} as Customer,
    service: {} as ShopService,
    drugsOrAlcohol: false,
    skinCondition: false,
    approveDesign: false,
    isNotPregnant: false,
    hasDisease: false,
    isMinor: false,
    understandsAllergyRisk: false,
    undertandsInfectionRisk: false,
    receiptOfAftercare: false,
    understandsVariation: false,
    understandsPermanence: false,
    understandsChoice: false,
    releaseArtist: false,
    understandsFDA: false,
    understandsMedicalRisk: false,
    agreesToAftercare: false,
    consentsToTattoo: false,
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
      console.error("TattooConsentComponent is missing selectedService input!");
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

    console.log("TattooConsent finalized:", this.consent);
    this.consentFilled.emit(this.consent);
  }
}
