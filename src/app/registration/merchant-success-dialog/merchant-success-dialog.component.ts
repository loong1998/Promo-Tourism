import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './merchant-success-dialog.component.html',
  styleUrls: ['merchant-success-dialog.component.css']
})
export class MerchantSuccessDialogComponent {
  message: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<MerchantSuccessDialogComponent>,
    private router: Router
  ) {}

  ngOnInit() {
    // Set your message here
    this.message =
      "The document is recorded for the merchant" +
      "<br>Your registration is pending" +
      "<br>Please wait for approval from the officer" +
      "<br>Once approved, we will send it to your email";
  }

  onHomeClick() {
    this.router.navigate(['/home']);
    this.dialogRef.close();
  }
}
