import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Import the UserService
import { User } from '../services/user.model'; // Import the User model
import { SaveSuccessfulDialogComponent } from './save-successful-dialog/save-successful-dialog.component';
import { RejectDialogComponent } from './reject-dialog/reject-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {
  accounts: User[] = [];

  constructor(
    public userService: UserService,
    private router: Router,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    // Fetch merchant accounts with 'pending' status from the server
    this.userService.getMerchantAccounts().subscribe((merchantAccounts) => {
      this.accounts = merchantAccounts;
    });
  }

  getFileNameFromPath(path: string): string {
    // Extract the file name from the path
    const parts = path.split('/');
    return parts[parts.length - 1];
  }
  toggleDetails(user: any) {
    user.expanded = !user.expanded;
  }
  
  approveUser(user: User) {
    this.userService.approveMerchant(user._id).subscribe(
      (updatedMerchant) => {
        user.status = 'Approved';
        this.dialog.open(SaveSuccessfulDialogComponent, {
          disableClose: true,
          width: 'auto',
          height: '230px',
        });
      },
      (error) => {
        console.error('Error approving merchant:', error);
      }
    );
  }

  rejectUser(user: User) {
    this.userService.rejectMerchant(user._id).subscribe(
      (updatedMerchant) => {
        user.status = 'Rejected';
        this.dialog.open(RejectDialogComponent, {
          disableClose: true,
          width: 'auto',
          height: '180px',
        });
      },
      (error) => {
        console.error('Error rejecting merchant:', error);
      }
    );
  }

  areButtonsHidden(user: User): boolean {
    // Implement your logic here to determine whether buttons should be hidden
    // For example, you can return true if the status is 'Approved' or 'Rejected'
    return user.status === 'Approved' || user.status === 'Rejected';
  }
  
  // private showSuccessMessage(message: string) {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 3000, // Duration in milliseconds (3 seconds in this example)
  //   });
  // }

}