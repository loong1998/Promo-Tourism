import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<RejectDialogComponent>,
    private router: Router
  ){}

  navigateToClose(): void {
    // Close the dialog
    this.dialogRef.close();
  }
}

  


