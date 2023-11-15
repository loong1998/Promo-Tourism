// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userType: string;
  private apiUrl = 'http://localhost:3000/api';

  // BehaviorSubject to track login status
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable().pipe(
    tap(isLoggedIn => console.log('IsLoggedIn$', isLoggedIn))
  );
  private userTypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userType$: Observable<string> = this.userTypeSubject.asObservable();
    
  private userStatusSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  userStatus$: Observable<string> = this.userStatusSubject.asObservable();;
  
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
  
    return this.http.post<any>(`${this.apiUrl}/login`, loginData)
    .pipe(
      map(response => {
        const user = response.user;

        if (user && user.userType && user.status === 'Approved') {
          this.setUserType(user.userType);
          this.setUserStatus(user.status);
          this.setLoggedIn();
          return response;
        } else {
          throw new Error('User is not approved or status is missing.');
          
        }
      })
    );
  }

  setUserType(userType: string) {
    this.userTypeSubject.next(userType);
  }
  
  setUserStatus(status: string) {
    this.userStatusSubject.next(status);
  }

  getUserType(): Observable<string> {
    // Logic to retrieve user type and return as an Observable
    return this.userType$;
  }

  setLoggedIn() {
    this.isLoggedInSubject.next(true);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  logout() {
    // Implement your logout logic, e.g., clearing user information and redirecting to login
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Add other authentication methods as needed
}
