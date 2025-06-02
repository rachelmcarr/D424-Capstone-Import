import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientIntakeService, ClientIntake } from '../../services/client-intake.service';
import { TattooConsentService } from '../../services/tattoo-consent.service';
import { PiercingConsentService } from '../../services/piercing-consent.service';
import { ParentalConsentService } from '../../services/parental-consent.service';
import { Customer } from '../../services/customer.service';
import { ShopServiceService, ShopService } from '../../services/shop-service.service';
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

  customer: Customer | null | undefined = undefined;
  isIncompleteCustomer: boolean = false;

  intake: ClientIntake = {
    customer: { customerID: 0 },
    serviceID: null,
    dateSubmitted: new Date().toISOString(),
    hasAllergies: false,
    allergyDetails: '',
    takesMedications: false,
    medicationDetails: '',
    hasMedicalConditions: false,
    conditionDetails: '',
    isMinor: false,
  };

  medicalConditionsList: string[] = [
    'TB', 'Epilepsy', 'Blood Thinners', 'Scarring/Keloiding',
    'HIV', 'Asthma', 'Eczema/Psoriasis', 'Gonorrhea/Syphilis',
    'Hepatitis', 'Heart Condition', 'MSRA/Staph Infection', 'Herpes',
    'Hemophilia/Other Bleeding Disorder', 'Pregnant/Nursing',
    'Allergic Reactions to Latex', 'Diabetes', 'Skin Conditions',
    'Fainting or Dizziness', 'Allergic Reaction to Antibiotics', 'Other'
  ];
  selectedConditions: string[] = [];

  services: ShopService[] = [];
  selectedServiceID: number | null = null;
  selectedService: ShopService | null = null;
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
      this.step = 6;
    } else {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  onServiceSelected() {
    if (this.selectedServiceID != null) {
      this.selectedService = this.services.find(s => s.serviceID === this.selectedServiceID) || null;
      this.intake.serviceID = this.selectedServiceID;
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

  useExistingCustomer(customer: Customer) {
    this.customer = customer;
    this.intake.customer = { customerID: customer.customerID! };
    this.intake.isMinor = this.checkIfMinor(customer.birthDate);
    this.checkCustomerCompleteness();
  }

  useNewCustomer(customer: Customer) {
    this.customer = customer;
    this.intake.customer = { customerID: customer.customerID! };
    this.intake.isMinor = this.checkIfMinor(customer.birthDate);
    this.checkCustomerCompleteness();
  }

  checkCustomerCompleteness() {
    this.isIncompleteCustomer = !this.customer?.birthDate || !this.customer?.driverLicense;
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
    this.tattooConsent = consent;
  }

  storePiercingConsent(consent: any) {
    this.piercingConsent = consent;
  }

  get consentComplete(): boolean {
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

    // ⚠️ Ensure customer and selectedServiceID are present
    if (!this.customer || this.selectedServiceID === null) {
      console.error('Customer or selected service ID is missing.');
      alert('Please select a customer and a service before submitting.');
      return;
    }

    this.clientIntakeService.submitIntake(this.intake).subscribe({
      next: (savedIntake) => {
        const intakeID = savedIntake.intakeID;

        // 🟢 Use non-null-asserted values here since we validated them above
        if (this.intake.isMinor && this.parentalConsent) {
          this.parentalConsent.intakeID = intakeID;
          this.parentalConsent.customer = this.customer;
          this.parentalConsent.shopServiceID = this.selectedServiceID;
          this.parentalConsentService.submitConsent(this.parentalConsent).subscribe();
        }

        if (this.selectedServiceType === 'Tattoo' && this.tattooConsent) {
          this.tattooConsent.intakeID = intakeID;
          this.tattooConsent.customer = this.customer;
          this.tattooConsent.shopServiceID = this.selectedServiceID;
          this.tattooConsentService.submitConsent(this.tattooConsent).subscribe();
        }

        if (this.selectedServiceType === 'Piercing' && this.piercingConsent) {
          this.piercingConsent.intakeID = intakeID;
          this.piercingConsent.customer = this.customer;
          this.piercingConsent.shopServiceID = this.selectedServiceID;
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
