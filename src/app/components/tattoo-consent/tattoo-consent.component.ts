import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TattooConsentService, TattooConsent } from '../../services/tattoo-consent.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-tattoo-consent',
  templateUrl: './tattoo-consent.component.html'
})
export class TattooConsentComponent {
  @Input() customerID!: number; // incoming from wizard

  @Output() consentFilled = new EventEmitter<TattooConsent>();

  finalizeConsent() {
    this.consent.customerID = this.customerID;
    this.consent.dateSigned = new Date().toISOString();
    this.consentFilled.emit(this.consent);
  }

  consent: TattooConsent = {
    intakeID: 0,
    customerID: 0,
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

  constructor(
    private tattooConsentService: TattooConsentService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.consent.customerID = this.customerID; // ✅ Assign when component loads
  }

  done() {
  this.consent.customerID = this.customerID;
  this.consent.dateSigned = new Date().toISOString();
  console.log("TattooConsent done:", this.consent);

  // Instead of submitting to backend directly, just emit the filled consent
  this.consentFilled.emit(this.consent);
}
}
