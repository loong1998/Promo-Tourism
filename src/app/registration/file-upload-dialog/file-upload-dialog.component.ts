import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['file-upload-dialog.component.css']
})
export class FileUploadDialogComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  uploadedFile: File | undefined;
  message: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    this.uploadedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.uploadedFile) {
      if (this.uploadedFile.type === 'application/pdf') {
        this.message =
          "The document is recorded for the merchant" +
          "<br>Your registration is pending" +
          "<br>Please wait for approval from the officer" +
          "<br>Once approved, we will send it to your email";

        // Reset file input and hide buttons
        this.fileInput.nativeElement.value = '';
        this.uploadedFile = undefined;
      } else {
        this.message = "Invalid file format. Please upload a PDF document.";
      }
    } else {
      this.message = "Please select a PDF document to upload.";
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onHomeClick() {
    this.router.navigate(['/home']);
    this.dialogRef.close();
  }
}
