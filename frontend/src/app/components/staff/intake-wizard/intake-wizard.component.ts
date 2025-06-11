import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientIntake, ClientIntakeService } from '../../../services/client-intake.service';
import { TattooConsentService } from '../../../services/tattoo-consent.service';
import { PiercingConsentService } from '../../../services/piercing-consent.service';
import { ParentalConsentService } from '../../../services/parental-consent.service';
import { Customer } from '../../../services/customer.service';
import { ShopService, ShopServiceService } from '../../../services/shop-service.service';
import { TattooConsentComponent } from '../tattoo-consent/tattoo-consent.component';
import { PiercingConsentComponent } from '../piercing-consent/piercing-consent.component';
import { ShopServiceFormComponent } from '../shop-service-form/shop-service-form.component';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-intake-wizard',
  templateUrl: './intake-wizard.component.html',
  styleUrls: ['../../../../styles/staff-theme.css']
})
export class IntakeWizardComponent implements OnInit {
  step = 1;
  totalSteps = 6;

  @ViewChild(TattooConsentComponent) tattooConsentComponent!: TattooConsentComponent;
  @ViewChild(PiercingConsentComponent) piercingConsentComponent!: PiercingConsentComponent;
  @ViewChild(ShopServiceFormComponent) shopServiceFormComponent!: ShopServiceFormComponent;

  constructor(
    private clientIntakeService: ClientIntakeService,
    private tattooConsentService: TattooConsentService,
    private piercingConsentService: PiercingConsentService,
    private parentalConsentService: ParentalConsentService,
    private shopServiceService: ShopServiceService,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {}

  customer: Customer | null = null;
  isIncompleteCustomer = false;

  intake: ClientIntake = {
    customer: {} as Customer,
    service: {} as ShopService,
    dateSubmitted: '',
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
    'Fainting or Dizziness', 'Allergic Reaction to Antibiotics', 'Other', 'None'
  ];
  selectedConditions: string[] = [];

  services: ShopService[] = [];
  selectedServiceID: number | null = null;
  selectedService: ShopService | null = null;
  selectedServiceType: 'Tattoo' | 'Piercing' = 'Tattoo';

  parentalConsent: any = null;
  tattooConsent: any = null;
  piercingConsent: any = null;

  stepLabels: string[] = [
    'Customer',
    'Medical Info',
    'Service',
    'Parental Consent',
    'Consent Form'
  ];

  ngOnInit(): void {
    this.shopServiceService.getAll().subscribe({
      next: (data) => this.services = data,
      error: (err) => console.error('Failed to load services', err)
    });
  }

  logout(): void {
    this.authService.logout();
  }

  nextStep() {
    if (this.step === 3 && !this.selectedService) {
      setTimeout(() => {
        if (this.shopServiceFormComponent) {
          this.shopServiceFormComponent.triggerSubmit();
        } else {
          console.warn('ShopServiceFormComponent is not yet available.');
        }
      });
      return;
    }
    if (this.step === 3 && this.intake.isMinor) this.step = 4;
    else if (this.step === 3) this.step = 5;
    else if (this.step === 4) this.step = 5;
    else if (this.step === 5) this.step = 6;
    else this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  goToStep(targetStep: number) {
    if (targetStep < this.step || this.canNavigateTo(targetStep)) {
      this.step = targetStep;
    }
  }

  canNavigateTo(step: number): boolean {
    switch (step) {
      case 1: return true;
      case 2: return !!this.customer && !this.isIncompleteCustomer;
      case 3: return !!this.customer;
      case 4: return this.intake.isMinor && !!this.selectedService;
      case 5: return !!this.selectedService;
      case 6: return this.consentComplete;
      default: return false;
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
    this.intake.customer = customer;
    this.intake.isMinor = this.checkIfMinor(customer.birthDate);
    this.checkCustomerCompleteness();
  }

  useNewCustomer(customer: Customer) {
    this.customer = customer;
    this.intake.customer = customer;
    this.intake.isMinor = this.checkIfMinor(customer.birthDate);
    this.checkCustomerCompleteness();
  }

  checkCustomerCompleteness() {
    if (!this.customer) {
      this.isIncompleteCustomer = true;
      return;
    }
    const isMinor = this.checkIfMinor(this.customer.birthDate);
    this.isIncompleteCustomer = !this.customer.birthDate || (!isMinor && !this.customer.driverLicense);
  }

  onCustomerUpdated(updated: Customer) {
    this.customer = updated;
    this.checkCustomerCompleteness();
  }

  onConditionChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) this.selectedConditions.push(value);
    else this.selectedConditions = this.selectedConditions.filter(c => c !== value);
    this.intake.conditionDetails = this.selectedConditions.join(', ');
    this.updateConditionStatus();
  }

  updateConditionStatus() {
    this.intake.hasMedicalConditions = this.selectedConditions.length > 0 || !!this.intake.conditionDetails?.trim();
  }

  updateMedicationStatus() {
    this.intake.takesMedications = !!this.intake.medicationDetails?.trim();
  }

  onServiceSelected() {
    if (this.selectedServiceID != null) {
      this.selectedService = this.services.find(s => s.serviceID === this.selectedServiceID) || null;
      this.intake.service = this.selectedService!;
    }
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

  handleServiceCreated(service: ShopService) {
    this.selectedService = service;
    this.selectedServiceID = service.serviceID!;
    this.intake.service = service;
    this.selectedServiceType = service.category === 'Tattoo' ? 'Tattoo' : 'Piercing';
    this.nextStep();
  }

  get consentComplete(): boolean {
    if (this.selectedServiceType === 'Tattoo') return !!this.tattooConsent;
    if (this.selectedServiceType === 'Piercing') return !!this.piercingConsent;
    return false;
  }

  submitIntake() {
    setTimeout(() => {
      if (!this.customer || !this.selectedService) {
        alert('Please select a customer and service before submitting.');
        return;
      }

      if (this.selectedServiceType === 'Tattoo' && this.tattooConsentComponent && !this.tattooConsent) {
        this.tattooConsentComponent.finalizeConsent();
        this.tattooConsent = this.tattooConsentComponent.getConsent();
      }

      if (this.selectedServiceType === 'Piercing' && this.piercingConsentComponent && !this.piercingConsent) {
        this.piercingConsentComponent.finalizeConsent();
        this.piercingConsent = this.piercingConsentComponent.getConsent?.() || this.piercingConsentComponent['consent'];
      }

      const intakePayload = {
        customerID: this.customer.customerID!,
        serviceID: this.selectedService.serviceID!,
        dateSubmitted: this.datePipe.transform(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss')!,
        hasAllergies: this.intake.hasAllergies,
        allergyDetails: this.intake.allergyDetails,
        takesMedications: this.intake.takesMedications,
        medicationDetails: this.intake.medicationDetails,
        hasMedicalConditions: this.intake.hasMedicalConditions,
        conditionDetails: this.selectedConditions.join(', '),
        isMinor: this.intake.isMinor,
      };

      this.clientIntakeService.submitIntake(intakePayload).subscribe({
        next: (savedIntake) => {
          const intakeID = savedIntake.intakeID;

          if (this.intake.isMinor && this.parentalConsent) {
            const cleaned = { ...this.parentalConsent };
            delete (cleaned as any).customer;
            delete (cleaned as any).service;
            delete cleaned.intakeID;

            cleaned.serviceID = cleaned.shopServiceID;
            delete cleaned.shopServiceID;

            this.parentalConsentService.submitConsent({
              customerID: this.customer?.customerID!,
              serviceID: this.selectedService?.serviceID!,
              ...cleaned
            }).subscribe();
          }

          if (this.selectedServiceType === 'Tattoo' && this.tattooConsent) {
            const cleaned = { ...this.tattooConsent };
            delete (cleaned as any).customer;
            delete (cleaned as any).service;
            delete cleaned.intakeID;

            this.tattooConsentService.submitConsent({
              customerID: this.customer?.customerID!,
              serviceID: this.selectedService?.serviceID!,
              ...cleaned
            }).subscribe();
          }

          if (this.selectedServiceType === 'Piercing' && this.piercingConsent) {
            const cleaned = { ...this.piercingConsent };
            delete (cleaned as any).customer;
            delete (cleaned as any).service;
            delete cleaned.intakeID;

            this.piercingConsentService.submitConsent({
              customerID: this.customer?.customerID!,
              serviceID: this.selectedService?.serviceID!,
              ...cleaned
            }).subscribe();
          }

          alert('All forms submitted successfully!');
          this.step = 6;
        },
        error: (err) => {
          console.error('Client Intake Error:', err);
          alert('Failed to submit intake.');
        }
      });
    }, 100);
  }
}
