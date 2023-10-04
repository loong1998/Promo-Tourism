import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Import the UserService
import { User } from '../services/user.model'; // Import the User model
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {
  accounts: User[] = [];

  constructor(public userService: UserService) {} //private snackBar: MatSnackBar

  ngOnInit() {
    // Subscribe to the accounts observable to get updates
    this.userService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts.map((user) => ({ ...user, expanded: false}));
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
  
  approveUser(user: any) {
    user.status = 'Approved'; // Set the status to 'approve'
    // this.showSuccessMessage('User has been approved successfully.');
  }

  rejectUser(user: any) {
    user.status = 'Rejected'; // Set the status to 'reject'
    // this.showSuccessMessage('User has been rejected successfully.');
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