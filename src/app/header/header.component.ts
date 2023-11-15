import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  userType$: Observable<string>;
  isLoggedIn: boolean;  // New property to store the non-observable value
  userType: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.userType$ = this.authService.getUserType();
  }

  logout() {
    // Handle logout logic
    this.authService.logout();
  }
}
