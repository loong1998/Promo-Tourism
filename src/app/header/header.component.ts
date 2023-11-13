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

  isLogin(){
    console.log(this.authService.getLoginUser());
    if(this.authService.getLoginUser() === null){
      console.log("false");
      return false;
    }
    else{
      console.log("true");
      return true;
    }
  }

  getUserRole(){
    if(this.authService.getLoginUser !== null){
      console.log(this.authService.getLoginUser().role);
      return this.authService.getLoginUser().role;
    }
    else{
      return '';
    }
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
