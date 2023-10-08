import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: string | null = null;

  // Define hardcoded users and their roles
  private users = [
    { username: 'user', password: 'user123', role: 'user' },
    { username: 'merchant@gmail.com', password: 'merchant123', role: 'merchant' },
    { username: 'officer', password: 'officer123', role: 'officer' },
  ];

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      this.loggedInUser = user.role;
      return true; // Authentication successful
    }

    return false; // Authentication failed
  }

  logout(): void {
    this.loggedInUser = null;
  }

  getLoggedInUser(): string | null {
    return this.loggedInUser;
  }

  isAuthenticated(): boolean {
    return this.loggedInUser !== null;
  }

  getUserRole(): string | null {
    return this.loggedInUser;
  }
}
