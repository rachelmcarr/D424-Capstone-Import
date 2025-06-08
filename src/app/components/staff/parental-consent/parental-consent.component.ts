import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentalConsent } from '../../../services/parental-consent.service';
import { Customer } from '../../../services/customer.service';
import { ShopService } from '../../../services/shop-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-parental-consent',
  templateUrl: './parental-consent.component.html',
  styleUrls: ['../../../../styles/staff-theme.css']
})
export class ParentalConsentComponent implements OnInit, AfterViewInit {
  @Input() customer!: Customer;
  @Input() selectedService!: ShopService;
  @Input() showNav: boolean = true;
  @Input() showSaveButton: boolean = true;
  @Output() consentFilled = new EventEmitter<ParentalConsent>();

  @ViewChild('form', { static: true }) form!: NgForm;

  private alreadyFinalized = false;

  constructor(
    private datePipe: DatePipe
  ) {}

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
      console.error('ParentalConsentComponent is missing selectedService input!');
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
    this.consent.dateSigned = this.datePipe.transform(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss')!;
    this.consent.customer = this.customer;
    this.consent.service = this.selectedService;

    console.log('ParentalConsent finalized:', this.consent);
    this.consentFilled.emit(this.consent);
  }

  /** Optional getter if IntakeWizardComponent needs to manually pull it */
  getConsent(): ParentalConsent {
    return this.consent;
  }
}
