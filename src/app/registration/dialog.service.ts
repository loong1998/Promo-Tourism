import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from './registration-success-dialog/registration-success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openRegistrationSuccessDialog(message: string) {
    this.dialog.open(RegistrationSuccessDialogComponent, {
      data: { message },
      width: '400px',
    });
  }
}
