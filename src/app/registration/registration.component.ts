import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      contactNumber: ['', [Validators.required, this.validateMalaysiaPhoneNumber]],
      email: ['', [Validators.required, Validators.email]],
      userType: ['user', Validators.required],
      merchantName: [''],
      companyDescription: [''],
      password: ['', [Validators.required, this.validatePassword]],
      repeatPassword: ['', Validators.required],
    }, {
      validator: [this.passwordMatchValidator, this.repeatPasswordValidator],
    });
  }

  // Custom validator function to check if passwords match
  private passwordMatchValidator(group: FormGroup): { passwordsNotMatch: boolean } | null {
    const password = group.get('password')?.value;
    const repeatPassword = group.get('repeatPassword')?.value;

    return password === repeatPassword ? null : { passwordsNotMatch: true };
  }

  // Custom validator function to check if repeatPassword is required
  private repeatPasswordValidator(control: FormGroup): { repeatPasswordRequired: boolean } | null {
    const repeatPassword = control.get('repeatPassword')?.value;

    return repeatPassword ? null : { repeatPasswordRequired: true };
  }

  // Custom validator function to check for valid Malaysia phone numbers
  private validateMalaysiaPhoneNumber(control: AbstractControl): { invalidPhoneNumber: boolean } | null {
    const phoneNumber = control.value;
    const malaysiaPhoneNumberPattern = /^\+60\d{9}$/;

    if (!phoneNumber || malaysiaPhoneNumberPattern.test(phoneNumber)) {
      return null; // Valid phone number
    } else {
      return { invalidPhoneNumber: true }; // Invalid phone number
    }
  }

  // Custom validator function to check password requirements (uppercase, lowercase, and symbol)
  private validatePassword(control: AbstractControl): { invalidPassword: boolean } | null {
    const password = control.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password || passwordPattern.test(password)) {
      return null; // Valid password
    } else {
      return { invalidPassword: true }; // Invalid password
    }
  }

  onSubmit() {
    // Mark all form controls as touched to trigger error messages
    for (const controlName in this.registrationForm.controls) {
      if (this.registrationForm.controls.hasOwnProperty(controlName)) {
        this.registrationForm.get(controlName)?.markAsTouched();
      }
    }

    // Check if the form is valid
    if (this.registrationForm.valid) {
      // Implement registration logic here
      const formData = this.registrationForm.value;
      console.log('Form Data:', formData);
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  hasError(controlName: string, errorName: string) {
    const control = this.registrationForm.get(controlName);
    return control && (control.touched || control.dirty) && control.hasError(errorName);
  }
}
