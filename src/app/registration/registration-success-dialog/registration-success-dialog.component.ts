import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-registration-success-dialog',
  templateUrl: './registration-success-dialog.component.html',
  styleUrls: ['registration-success-dialog.component.css']
})
export class RegistrationSuccessDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<RegistrationSuccessDialogComponent>,
    private router: Router
  ) {}

  navigateToLogin(): void {
    // Close the dialog
    this.dialogRef.close();

    // Navigate to the home screen
    this.router.navigate(['/login']); // Replace '/home' with the actual route for your home screen
  }
}
