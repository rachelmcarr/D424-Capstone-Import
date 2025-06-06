import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ClientIntakeFormComponent } from './components/client-intake-form/client-intake-form.component';
import { ParentalConsentComponent } from './components/parental-consent/parental-consent.component';
import { ShopServiceFormComponent } from './components/shop-service-form/shop-service-form.component';
import { ShopServiceListComponent } from './components/shop-service-list/shop-service-list.component';
import { TattooConsentComponent } from './components/tattoo-consent/tattoo-consent.component';
import { PiercingConsentComponent } from './components/piercing-consent/piercing-consent.component';
import { HomeComponent } from './components/home/home.component';
import { PortalComponent } from './components/portal/portal.component';
import { PublicArtistsComponent } from './components/public-artists/public-artists.component';
import { PublicArtistsDetailComponent } from './components/public-artists-details/public-artists-detail.component';
import { IntakeWizardComponent } from './components/intake-wizard/intake-wizard.component';
import { CustomerLookupComponent } from './components/customer-lookup/customer-lookup.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { DatePipe } from '@angular/common';
import { StaffLoginComponent } from './components/staff-login/staff-login.component';

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
    StaffLoginComponent
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
