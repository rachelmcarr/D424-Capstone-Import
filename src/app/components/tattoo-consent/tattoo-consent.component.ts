import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TattooConsentService, TattooConsent } from '../../services/tattoo-consent.service';

@Component({
  selector: 'app-tattoo-consent',
  templateUrl: './tattoo-consent.component.html'
})
export class TattooConsentComponent {
  consent: TattooConsent = {

    intakeID: 0,
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

  constructor(private tattooConsentService: TattooConsentService) {}

  onSubmit(form: NgForm) {
    this.consent.dateSigned = new Date().toISOString();

    this.tattooConsentService.submitConsent(this.consent).subscribe({
      next: () => {
        alert('Tattoo consent submitted!');
        form.resetForm();
      },
      error: (err: any) => {
        console.error(err);
        alert('Failed to submit tattoo consent.');
      }
    });
  }
}
