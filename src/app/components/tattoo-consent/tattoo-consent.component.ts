import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TattooConsent } from '../../services/tattoo-consent.service';
import { Customer } from '../../services/customer.service';
import { ShopService } from '../../services/shop-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tattoo-consent',
  templateUrl: './tattoo-consent.component.html'
})
export class TattooConsentComponent implements OnInit, AfterViewInit {
  @Input() customer!: Customer;
  @Input() selectedService!: ShopService;
  @Input() showSaveButton: boolean = true;
  @Output() consentFilled = new EventEmitter<TattooConsent>();

  @ViewChild('form', { static: true }) form!: NgForm;

  private alreadyFinalized = false;

  constructor(
    private datePipe: DatePipe
  ) {}

  consent: TattooConsent & { customer?: Customer; service?: ShopService } = {
    intakeID: 0,
    customerID: 0,
    serviceID: 0,
    customer: {} as Customer,
    service: {} as ShopService,
    drugsOrAlcohol: false,
    skinCondition: false,
    approveDesign: false,
    notPregnant: false,
    hasDisease: false,
    minor: false,
    understandsAllergyRisk: false,
    understandsInfectionRisk: false,
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
      this.consent.serviceID = this.selectedService.serviceID!;
      this.consent.service = this.selectedService;
    } else {
      console.error('TattooConsentComponent is missing selectedService input!');
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.form?.valueChanges) {
        this.form.valueChanges.subscribe(() => {
          if (this.form.valid && !this.alreadyFinalized) {
            this.finalizeConsent();
          }
        });
      }
    });
  }

  finalizeConsent() {
      if (this.alreadyFinalized) return;
  
      if (!this.selectedService?.serviceID || !this.customer?.customerID) {
        console.error('Cannot finalize consent: missing customer or service ID.');
        return;
      }
  
      this.consent.customerID = this.customer.customerID;
      this.consent.serviceID = this.selectedService.serviceID;
      this.consent.dateSigned = this.datePipe.transform(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss')!;
  
      delete (this.consent as any).customer;
      delete (this.consent as any).service;
  
      this.alreadyFinalized = true;
  
      console.log('TattooConsent finalized:', this.consent);
      this.consentFilled.emit(this.consent);
    }

  getConsent(): TattooConsent {
    return this.consent;
  }
}
