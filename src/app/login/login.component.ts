import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  submitted: boolean = false; 

  constructor(private router: Router) {} // Inject the Router service

  onSubmit() {
    this.submitted = true;

    // Check if either username or password is blank
    if (!this.username || !this.password) {
      return; // Do not proceed with form submission
    }

    // If both fields are filled, perform your login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    console.log('Remember Me:', this.rememberMe);
  }
  
  onRegister() {
    // Implement your registration logic here
    this.router.navigate(['/registration']);
  }
}
