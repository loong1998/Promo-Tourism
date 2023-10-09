import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  get userRole(): string | null {
    return this.authService.getUserRole();
  }

  logout() {
    // Perform logout actions, e.g., clearing session, token, etc.
    this.authService.logout();

    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }

  //To check if user is logged in
  checkLoginP(){
    //if isLoggedIn = false
    if(!this.isLoggedIn){
      //navigate to login page
      this.router.navigate(['/login']);
    }
    //if isLoggedIn = true
    else if(this.isLoggedIn){
      //navigate to product page
      this.router.navigate(['/product'])
    }
  }

  checkLoginR(){
    //if isLoggedIn = false
    if(!this.isLoggedIn){
      //navigate to login page
      this.router.navigate(['/login']);
    }
    //if isLoggedIn = true
    else if(this.isLoggedIn){
      //navigate to review product page
      this.router.navigate(['/reviewProduct'])
    }
  }
}
