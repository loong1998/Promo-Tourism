import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-successful-dialog',
  templateUrl: './save-successful-dialog.component.html',
  styleUrls: ['./save-successful-dialog.component.css']
})
export class SaveSuccessfulDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<SaveSuccessfulDialogComponent>,
    private router: Router
  ) {}
  
  navigateToClose(): void {
    // Close the dialog
    this.dialogRef.close();
  }

}
