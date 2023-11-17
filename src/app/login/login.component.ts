// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,private snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        // Log the entire response to the console
        console.log('Login response:', response);

        // Assuming your API returns user information after successful login
        const user = response.user;

        // Check if the 'userType' property is present in the response
        if (user && user.userType) {
          this.authService.setUserType(user.userType);
          console.log('Login successful:', user);

           // Set the username in the AuthService
          this.authService.setUsername(user.username);

          // Navigate based on user type
          if (user.userType === 'officer') {
            this.router.navigate(['/home']);
          } else if (user.userType === 'merchant') {
            this.router.navigate(['/home']);
          } else if (user.userType === 'user') {
            this.router.navigate(['/home']);
          } else {
            console.error('Unknown user type:', user.userType);
          }
        } else {
          console.error('User type not present in the response:', response);
          this.snackBar.open('Please fill in all fields.', 'Close', {
            duration: 3000
          });
        }
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }
}
