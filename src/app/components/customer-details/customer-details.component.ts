import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ClientIntakeService } from '../../services/client-intake.service';
import { TattooConsentService } from '../../services/tattoo-consent.service';
import { PiercingConsentService } from '../../services/piercing-consent.service';
import { ParentalConsentService } from '../../services/parental-consent.service';
import { ShopServiceService } from '../../services/shop-service.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
})
export class CustomerDetailsComponent implements OnInit {
  customerID!: number;
  customer: any;
  intake: any;
  tattooConsent: any;
  piercingConsent: any;
  parentalConsent: any;
  services: any[] = [];

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
    this.intakeService.getByCustomerId(this.customerID).subscribe(i => this.intake = i);
    this.tattooService.getByCustomerId(this.customerID).subscribe(t => this.tattooConsent = t);
    this.piercingService.getByCustomerId(this.customerID).subscribe(p => this.piercingConsent = p);
    this.parentalService.getByCustomerId(this.customerID).subscribe(pc => this.parentalConsent = pc);
    this.shopService.getByCustomer(this.customerID).subscribe(s => this.services = s);
  }
}
