import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Import the UserService
import { User } from '../services/user.model'; // Import the User model
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {
  accounts: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Subscribe to the accounts observable to get updates
    this.userService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts.map((user) => ({ ...user, expanded: false }));
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
  
}