import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientIntakeService } from '../../services/client-intake.service';
import { TattooConsentService } from '../../services/tattoo-consent.service';
import { PiercingConsentService } from '../../services/piercing-consent.service';
import { ParentalConsentService } from '../../services/parental-consent.service';
import { Customer } from '../../services/customer.service';
import { ShopServiceService } from '../../services/shop-service.service';
import { TattooConsentComponent } from '../tattoo-consent/tattoo-consent.component';
import { PiercingConsentComponent } from '../piercing-consent/piercing-consent.component';

@Component({
  selector: 'app-intake-wizard',
  templateUrl: './intake-wizard.component.html',
})
export class IntakeWizardComponent implements OnInit {
  step = 1;

  @ViewChild(TattooConsentComponent)
  tattooConsentComponent!: TattooConsentComponent;

  @ViewChild(PiercingConsentComponent)
  piercingConsentComponent!: PiercingConsentComponent;

  constructor(
    private clientIntakeService: ClientIntakeService,
    private tattooConsentService: TattooConsentService,
    private piercingConsentService: PiercingConsentService,
    private parentalConsentService: ParentalConsentService,
    private shopServiceService: ShopServiceService
  ) {}

  customer: any = null;
  isIncompleteCustomer: boolean = false;

  intake = {
    customer: { customerID: 0 },
    serviceID: 0,
    hasMedicalConditions: false,
    conditionDetails: '',
    takesMedications: false,
    medicationDetails: '',
    isMinor: false
  };

  medicalConditionsList: string[] = [/* same as before */];
  selectedConditions: string[] = [];

  services: any[] = [];
  selectedServiceID: number | null = null;
  selectedService: any = null;
  selectedServiceType: 'Tattoo' | 'Piercing' = 'Tattoo';

  parentalConsent: any = null;
  tattooConsent: any = null;
  piercingConsent: any = null;

  ngOnInit(): void {
    this.shopServiceService.getAll().subscribe({
      next: (data) => this.services = data,
      error: (err) => console.error('Failed to load services', err)
    });
  }

  nextStep() {
    if (this.step === 3 && this.intake.isMinor) {
      this.step = 4;
    } else if (this.step === 3 && !this.intake.isMinor) {
      this.step = 5;
    } else if (this.step === 4) {
      this.step = 5;
    } else if (this.step === 5) {
      this.step = 6; // User will now press "Submit"
    } else {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  onServiceSelected() {
    if (this.selectedServiceID != null) {
      const id = Number(this.selectedServiceID);
      this.selectedService = this.services.find(s => s.serviceID === id);

      if (this.selectedService) {
        this.intake.serviceID = this.selectedService.serviceID;
        this.selectedServiceType = (this.selectedService.category === 'Piercing') ? 'Piercing' : 'Tattoo';
      }
    }
  }

  checkIfMinor(birthDate: string | Date): boolean {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    return (
      age < 18 ||
      (age === 18 && monthDiff < 0) ||
      (age === 18 && monthDiff === 0 && dayDiff < 0)
    );
  }

  useExistingCustomer(customer: any) {
    this.customer = customer;
    this.intake.customer = customer.customerID;
    this.intake.isMinor = this.checkIfMinor(customer.birthDate);
    this.checkCustomerCompleteness();
  }

  useNewCustomer(customer: any) {
    this.customer = customer;
    this.intake.customer = customer.customerID;
    this.intake.isMinor = this.checkIfMinor(customer.birthDate);
    this.checkCustomerCompleteness();
  }

  checkCustomerCompleteness() {
    this.isIncompleteCustomer = !this.customer.birthDate || !this.customer.driverLicense;
  }

  onCustomerUpdated(updated: Customer) {
    this.customer = updated;
    this.checkCustomerCompleteness();
  }

  onConditionChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedConditions.push(value);
    } else {
      this.selectedConditions = this.selectedConditions.filter(c => c !== value);
    }
    this.intake.conditionDetails = this.selectedConditions.join(', ');
    this.updateConditionStatus();
  }

  updateConditionStatus() {
    this.intake.hasMedicalConditions = this.selectedConditions.length > 0 || !!this.intake.conditionDetails?.trim();
  }

  updateMedicationStatus() {
    this.intake.takesMedications = !!this.intake.medicationDetails?.trim();
  }

  storeParentalConsent(consent: any) {
    this.parentalConsent = consent;
  }

  storeTattooConsent(consent: any) {
    console.log('[Wizard] storeTattooConsent received:', consent);
    this.tattooConsent = consent;
  }

  storePiercingConsent(consent: any) {
    console.log('[Wizard] storePiercingConsent received:', consent);
    this.piercingConsent = consent;
  }

  get consentComplete(): boolean {
    console.log('[Wizard] Consent check:', this.tattooConsent || this.piercingConsent);
    if (this.selectedServiceType === 'Tattoo') return !!this.tattooConsent;
    if (this.selectedServiceType === 'Piercing') return !!this.piercingConsent;
    return false;
  }

  submitIntake() {
  this.intake.conditionDetails = this.selectedConditions.join(', ');

  if (this.selectedServiceType === 'Tattoo' && this.tattooConsentComponent) {
    this.tattooConsentComponent.finalizeConsent();
  }

  if (this.selectedServiceType === 'Piercing' && this.piercingConsentComponent) {
    this.piercingConsentComponent.finalizeConsent();
  }

  // ✅ Fix the structure so the backend sees customer -> customerID
  this.intake.customer = { customerID: this.customer?.customerID };

  this.clientIntakeService.submitIntake(this.intake).subscribe({
    next: (savedIntake) => {
      const intakeID = savedIntake.intakeID;

      if (this.intake.isMinor && this.parentalConsent) {
        this.parentalConsent.intakeID = intakeID;
        this.parentalConsent.customer = this.customer;
        this.parentalConsentService.submitConsent(this.parentalConsent).subscribe();
      }

      if (this.selectedServiceType === 'Tattoo' && this.tattooConsent) {
        this.tattooConsent.intakeID = intakeID;
        this.tattooConsent.customer = this.customer;
        this.tattooConsentService.submitConsent(this.tattooConsent).subscribe();
      }

      if (this.selectedServiceType === 'Piercing' && this.piercingConsent) {
        this.piercingConsent.intakeID = intakeID;
        this.piercingConsent.customer = this.customer;
        this.piercingConsentService.submitConsent(this.piercingConsent).subscribe();
      }

      alert('All forms submitted successfully!');
      this.step = 6;
    },
    error: (err) => {
      console.error(err);
      alert('Failed to submit intake.');
    }
  });
}
}
