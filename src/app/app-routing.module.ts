import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/public/home/home.component';
import { CustomerFormComponent } from './components/staff/customer-form/customer-form.component';
import { CustomerListComponent } from './components/staff/customer-list/customer-list.component';
import { ArtistFormComponent } from './components/staff/artist-form/artist-form.component';
import { ArtistListComponent } from './components/staff/artist-list/artist-list.component';
import { ClientIntakeFormComponent } from './components/staff/client-intake-form/client-intake-form.component';
import { ParentalConsentComponent } from './components/staff/parental-consent/parental-consent.component';
import { PiercingConsentComponent } from './components/staff/piercing-consent/piercing-consent.component';
import { ShopServiceFormComponent } from './components/staff/shop-service-form/shop-service-form.component';
import { ShopServiceListComponent } from './components/staff/shop-service-list/shop-service-list.component';
import { TattooConsentComponent } from './components/staff/tattoo-consent/tattoo-consent.component';
import { PortalComponent } from './components/staff/portal/portal.component';
import { PublicArtistsComponent } from './components/public/public-artists/public-artists.component';
import { PublicArtistsDetailComponent } from './components/public/public-artists-details/public-artists-detail.component';
import { IntakeWizardComponent } from './components/staff/intake-wizard/intake-wizard.component';
import { CustomerDetailsComponent } from './components/staff/customer-details/customer-details.component';
import { StaffLoginComponent } from './components/staff/staff-login/staff-login.component';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './components/public/contact/contact.component';
import { AboutComponent } from './components/public/about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'customers', component: CustomerListComponent },
    { path: 'add-customer', component: CustomerFormComponent },
    { path: 'artists', component: ArtistListComponent},
    { path: 'add-artist', component: ArtistFormComponent},
    { path: 'intake', component: ClientIntakeFormComponent},
    { path: 'parental-consent', component: ParentalConsentComponent},
    { path: 'piercing-consent', component: PiercingConsentComponent},
    { path: 'add-service', component: ShopServiceFormComponent},
    { path: 'services', component: ShopServiceListComponent},
    { path: 'tattoo-consent', component: TattooConsentComponent},
    { path: 'portal', component: PortalComponent, canActivate: [AuthGuard]},
    { path: 'public-artists', component: PublicArtistsComponent},
    { path: 'public-artists/:id', component: PublicArtistsDetailComponent },
    { path: 'intake-wizard', component: IntakeWizardComponent},
    { path: 'customers/:id', component: CustomerDetailsComponent },
    { path: 'login', component: StaffLoginComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}