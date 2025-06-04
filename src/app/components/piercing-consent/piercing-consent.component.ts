import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PiercingConsent } from '../../services/piercing-consent.service';
import { Customer } from '../../services/customer.service';
import { ShopService } from '../../services/shop-service.service';

@Component({
  selector: 'app-piercing-consent',
  templateUrl: './piercing-consent.component.html'
})
export class PiercingConsentComponent implements OnInit, AfterViewInit {
  @Input() customer!: Customer;
  @Input() selectedService!: ShopService;
  @Input() showSaveButton: boolean = true;
  @Output() consentFilled = new EventEmitter<PiercingConsent>();

  @ViewChild('form', { static: true }) form!: NgForm;

  private alreadyFinalized = false;

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
      console.error('PiercingConsentComponent is missing selectedService input!');
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

    if (!this.selectedService?.serviceID) {
      console.error('Cannot finalize consent: invalid shopServiceID.');
      return;
    }

    this.alreadyFinalized = true;
    this.consent.dateSigned = new Date().toISOString();
    this.consent.customer = this.customer;
    this.consent.service = this.selectedService;

    console.log('PiercingConsent finalized:', this.consent);
    this.consentFilled.emit(this.consent);
  }

  /** Optional getter method for outside access like IntakeWizardComponent **/
  getConsent(): PiercingConsent {
    return this.consent;
  }
}
