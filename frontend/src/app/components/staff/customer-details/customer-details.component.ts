import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { ClientIntakeService } from '../../../services/client-intake.service';
import { TattooConsentService } from '../../../services/tattoo-consent.service';
import { PiercingConsentService } from '../../../services/piercing-consent.service';
import { ParentalConsentService } from '../../../services/parental-consent.service';
import { ShopServiceService } from '../../../services/shop-service.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['../../../../styles/staff-theme.css']
})
export class CustomerDetailsComponent implements OnInit {
  customerID!: number;
  customer: any;
  intake: any;
  tattooConsent: any;
  piercingConsent: any;
  parentalConsent: any;
  services: any[] = [];
  expandedServiceId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private intakeService: ClientIntakeService,
    private tattooService: TattooConsentService,
    private piercingService: PiercingConsentService,
    private parentalService: ParentalConsentService,
    private shopService: ShopServiceService
  ) {}

  ngOnInit(): void {
    this.customerID = Number(this.route.snapshot.paramMap.get('id'));

    this.customerService.getById(this.customerID).subscribe(c => this.customer = c);

    this.intakeService.getByCustomerId(this.customerID).subscribe(intakes => {
      if (Array.isArray(intakes) && intakes.length > 0) {
        this.intake = intakes.sort(
          (a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime()
        )[0];
      }
    });

    this.shopService.getByCustomer(this.customerID).subscribe(services => {
      console.log('Services loaded:', services); // log full array
      this.services = services.map(service => ({
        ...service,
        showServiceDetails: false // 🔹 Add toggle property here
      }));

      this.tattooService.getByCustomerId(this.customerID).subscribe(tattoos => {
        tattoos.forEach((consent: any) => {
          const match = this.services.find(s => s.serviceID === consent.serviceID);
          if (match) match.tattooConsent = consent;
        });
      });

      this.piercingService.getByCustomerId(this.customerID).subscribe(piercings => {
        piercings.forEach((consent: any) => {
          const match = this.services.find(s => s.serviceID === consent.serviceID);
          if (match) match.piercingConsent = consent;
        });
      });

      this.parentalService.getByCustomerId(this.customerID).subscribe(parents => {
        parents.forEach((consent: any) => {
          const match = this.services.find(s => s.serviceID === consent.serviceID);
          if (match) match.parentalConsent = consent;
        });
      });
    });
  }

  toggleServiceExpansion(serviceId: number): void {
    const id = Number(serviceId);
    this.expandedServiceId = this.expandedServiceId === id ? null : id;
  }

  // 🔹 Optional: For toggling service detail block separately if you want
  toggleServiceDetails(service: any): void {
    service.showServiceDetails = !service.showServiceDetails;
  }
}
