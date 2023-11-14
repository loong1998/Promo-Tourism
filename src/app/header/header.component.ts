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
    if(this.authService.getLoginUser() === null){
      return false;
    }
    else{
      return true;
    }
  }

  getUserRole(){
    if(this.authService.getLoginUser !== null){
      return this.authService.getLoginUser().role;
    }
    else{
      return '';
    }
  }

  checkLogin(){
    if(this.authService.getLoginUser() === null){
      this.router.navigate(['/login']);
    }
  }

  logout() {
    // Perform logout actions, e.g., clearing session, token, etc.
    this.authService.logout();

    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }
}
