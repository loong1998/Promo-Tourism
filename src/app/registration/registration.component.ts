import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from './registration-success-dialog/registration-success-dialog.component';
import { MerchantSuccessDialogComponent } from './merchant-success-dialog/merchant-success-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService} from '../services/user.service';
import { User } from '../services/user.model';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  selectedPdfFile: File | undefined;
  nextMerchantID: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService // Inject the UserService
  ) {}

  ngOnInit(): void {
    this.nextMerchantID = '005';
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      contactNumber: ['', [Validators.required, this.validateMalaysiaPhoneNumber]],
      email: ['', [Validators.required, Validators.email]],
      userType: ['user', Validators.required],
      merchantName: [''],
      companyDescription: [''],
      password: ['', [Validators.required, this.validatePassword]],
      repeatPassword: ['', Validators.required],
      pdfFile: [''],
    }, {
      validator: [this.passwordMatchValidator, this.repeatPasswordValidator],
    });

    // Subscribe to changes in userType and update field validators accordingly
    this.registrationForm.get('userType')?.valueChanges.subscribe(userType => {
      const merchantNameControl = this.registrationForm.get('merchantName');
      const companyDescriptionControl = this.registrationForm.get('companyDescription');
      const pdfFileControl = this.registrationForm.get('pdfFile');

      if (userType === 'user') {
        // Clear validators for optional fields
        merchantNameControl.clearValidators();
        companyDescriptionControl.clearValidators();
        pdfFileControl.clearValidators();
      } else {
        // Set validators back to required for merchant
        merchantNameControl.setValidators(Validators.required);
        companyDescriptionControl.setValidators(Validators.required);
        pdfFileControl.setValidators(Validators.required);
      }

      // Update the validity of the controls
      merchantNameControl.updateValueAndValidity();
      companyDescriptionControl.updateValueAndValidity();
      pdfFileControl.updateValueAndValidity();
    });
  }  

  // Method to handle PDF file input change
  onPdfFileChange(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      // Set the selected PDF file
      this.selectedPdfFile = fileInput.files[0];

      // Clear the validation error for the PDF file input
      this.registrationForm.get('pdfFile')?.setErrors(null);
    } else {
      // Clear the selected PDF file
      this.selectedPdfFile = undefined;
    }
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
      const formData = this.registrationForm.value;
      console.log('Form Data:', formData);
      if (this.registrationForm.get('userType')?.value === 'merchant') {
        // Check if a PDF file is selected
        if (!this.selectedPdfFile) {
          // Show an error message for the PDF file input
          this.registrationForm.get('pdfFile')?.setErrors({ required: true });
          return; // Stop registration process if PDF is not selected
        }
    
        // PDF file is selected, you can proceed with registration
        // Implement registration logic here
        const newUser: User = {
          username: formData.username,
          merchantName: formData.merchantName,
          contactNumber: formData.contactNumber,
          email: formData.email,
          companyDescription: formData.companyDescription,
          password: formData.password,
          pdfFile: formData.pdfFile,
          status: 'pending',
          expanded: false,
          merchantID: this.nextMerchantID,
        };
        const nextIDNumber = parseInt(this.nextMerchantID) + 1;
        this.nextMerchantID = nextIDNumber.toString().padStart(3, '0');
        this.userService.addAccount(newUser);
    
        // Show the file upload dialog
        this.dialog.open(MerchantSuccessDialogComponent, {
          disableClose: true,
        });
      }
      else{
        console.log('Form Data:', formData);
        this.dialog.open(RegistrationSuccessDialogComponent, {
          disableClose: true
        });
      }
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
