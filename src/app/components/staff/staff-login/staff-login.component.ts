import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['../../../../styles/staff-theme.css']
})
export class StaffLoginComponent {
  username = '';
  password = '';
  loginError = false;

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === 'password123') {
      sessionStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/portal']);
    } else {
      this.loginError = true;
    }
  }
}
