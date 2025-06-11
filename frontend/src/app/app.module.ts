import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/staff/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/staff/customer-form/customer-form.component';
import { ArtistFormComponent } from './components/staff/artist-form/artist-form.component';
import { ArtistListComponent } from './components/staff/artist-list/artist-list.component';
import { ClientIntakeFormComponent } from './components/staff/client-intake-form/client-intake-form.component';
import { ParentalConsentComponent } from './components/staff/parental-consent/parental-consent.component';
import { ShopServiceFormComponent } from './components/staff/shop-service-form/shop-service-form.component';
import { ShopServiceListComponent } from './components/staff/shop-service-list/shop-service-list.component';
import { TattooConsentComponent } from './components/staff/tattoo-consent/tattoo-consent.component';
import { PiercingConsentComponent } from './components/staff/piercing-consent/piercing-consent.component';
import { HomeComponent } from './components/public/home/home.component';
import { PortalComponent } from './components/staff/portal/portal.component';
import { PublicArtistsComponent } from './components/public/public-artists/public-artists.component';
import { PublicArtistsDetailComponent } from './components/public/public-artists-details/public-artists-detail.component';
import { IntakeWizardComponent } from './components/staff/intake-wizard/intake-wizard.component';
import { CustomerLookupComponent } from './components/staff/customer-lookup/customer-lookup.component';
import { CustomerDetailsComponent } from './components/staff/customer-details/customer-details.component';
import { DatePipe } from '@angular/common';
import { StaffLoginComponent } from './components/staff/staff-login/staff-login.component';
import { AboutComponent } from './components/public/about/about.component';
import { ContactComponent } from './components/public/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerFormComponent,
    ArtistFormComponent,
    ArtistListComponent,
    ClientIntakeFormComponent,
    ParentalConsentComponent,
    ShopServiceFormComponent,
    ShopServiceListComponent,
    TattooConsentComponent,
    PiercingConsentComponent,
    HomeComponent,
    PortalComponent,
    PublicArtistsComponent,
    PublicArtistsDetailComponent,
    IntakeWizardComponent,
    CustomerLookupComponent,
    CustomerDetailsComponent,
    StaffLoginComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
