import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  submitted: boolean = false;
  loginError: boolean = false;

  constructor(private router: Router, private authService: AuthService) {} // Inject the Router and AuthService

  onSubmit() {
    this.submitted = true;

    // Check if either username or password is blank
    if (!this.username || !this.password) {
      return; // Do not proceed with form submission
    }
    if (!this.authService.login(this.username, this.password)) {
      this.loginError = true; // Set the error flag to true
      return; // Do not proceed with login
    }
    // Perform authentication using the AuthService
    const isAuthenticated = this.authService.login(
      this.username,
      this.password
    );

    if (isAuthenticated) {
      // Authentication successful, redirect to the appropriate page
      if (this.authService.getLoggedInUser() === 'merchant') {
        // Merchant is logged in, redirect to the merchant dashboard or other appropriate page
        this.router.navigate(['/home']);
      } else if (this.authService.getLoggedInUser() === 'officer') {
        // Officer is logged in, redirect to the officer dashboard or other appropriate page
        this.router.navigate(['/home']);
      } else {
        // Regular user is logged in, redirect to the user dashboard or other appropriate page
        this.router.navigate(['/home']);
      }
    } else {
      // Authentication failed, handle it (e.g., display an error message)
    }
  }

  onRegister() {
    // Implement your registration logic here
    this.router.navigate(['/registration']);
  }
}
