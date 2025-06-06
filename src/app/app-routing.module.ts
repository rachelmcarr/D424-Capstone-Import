import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ClientIntakeFormComponent } from './components/client-intake-form/client-intake-form.component';
import { ParentalConsentComponent } from './components/parental-consent/parental-consent.component';
import { PiercingConsentComponent } from './components/piercing-consent/piercing-consent.component';
import { ShopServiceFormComponent } from './components/shop-service-form/shop-service-form.component';
import { ShopServiceListComponent } from './components/shop-service-list/shop-service-list.component';
import { TattooConsentComponent } from './components/tattoo-consent/tattoo-consent.component';
import { PortalComponent } from './components/portal/portal.component';
import { PublicArtistsComponent } from './components/public-artists/public-artists.component';
import { PublicArtistsDetailComponent } from './components/public-artists-details/public-artists-detail.component';
import { IntakeWizardComponent } from './components/intake-wizard/intake-wizard.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { StaffLoginComponent } from './components/staff-login/staff-login.component';
import { AuthGuard } from './auth.guard';

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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}