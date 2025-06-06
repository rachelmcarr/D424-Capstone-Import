import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html'
})
export class PortalComponent {

  constructor(private router: Router,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
  }

}
