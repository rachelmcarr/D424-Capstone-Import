import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TattooConsent } from '../../services/tattoo-consent.service';

@Component({
  selector: 'app-tattoo-consent',
  templateUrl: './tattoo-consent.component.html'
})
export class TattooConsentComponent implements OnInit {
  @Input() customerID!: number;
  @Input() shopServiceID!: number;
  @Output() consentFilled = new EventEmitter<TattooConsent>();

  consent: TattooConsent = {
    intakeID: 0,
    customerID: 0,
    shopServiceID: 0,
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
    if (this.customerID) {
      this.consent.customerID = this.customerID;
    }

    if (this.shopServiceID) {
      this.consent.shopServiceID = this.shopServiceID;
    } else {
      console.error("TattooConsentComponent is missing shopServiceID input!");
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
    console.log("TattooConsent finalized:", this.consent);
    this.consentFilled.emit(this.consent);
  }

}
