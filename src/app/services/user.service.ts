import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { User } from './user.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private accounts: User[] = [];
  private accountsSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.accounts);
  private apiUrl = 'http://localhost:3000/api'; // Update this to your actual API endpoint
  private merchantIDCounter: number | undefined;

  private allAccounts: User[] = [];
  private allAccountsUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    // Initialize the merchantIDCounter from the server on service instantiation
    this.fetchNextMerchantID().subscribe(
      (nextMerchantID) => (this.merchantIDCounter = parseInt(nextMerchantID)),
      (error) => console.error('Error fetching next merchant ID:', error)
    );
  }

  getAccounts(): Observable<User[]> {
    return this.accountsSubject.asObservable();
  }

  getAllAccounts(){
    this.http.get<{message: string, users: any}>('http://localhost:3000/api/getMerchantAccounts')
      .pipe(map(
        (userData) => {
          return userData.users.map(user => {
            return {
              username: user.username,
              contactNumber: user.contactNumber,
              email: user.email,
              userType: user.userType,
              password: user.password,
              status: user.status,
              expanded: user.expanded,
              merchantID: user.merchantID
            };
          });
        }
      ))
      .subscribe(transformedAccount => {
        this.allAccounts = transformedAccount;
        this.allAccountsUpdated.next([...this.allAccounts]);
      })
  }

  getAllAccountsUpdateListener(){
    return this.allAccountsUpdated.asObservable();
  }

  addAccount(account: User) {
    if (account.userType === 'merchant') {
      this.merchantIDCounter++; // Increment the counter only for merchant users
      const merchantID = `00${this.merchantIDCounter}`.slice(-3); // Format as '001', '002', etc.
      account.merchantID = merchantID;
    }

    this.accounts.push(account);
    this.accountsSubject.next(this.accounts);
  }

  getLastMerchantID(): string {
    return `00${this.merchantIDCounter}`.slice(-3);
  }
  

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user).pipe(
      catchError(error => {
        console.error('Error in register:', error);

        // Show an error message using MatSnackBar
        this.snackBar.open('Email or username already in use', 'Close', {
          duration: 5000, // Duration in milliseconds
        });

        return throwError(error); // Rethrow the error
      })
    );
  }

  registerMerchant(merchant: User): Observable<User> {
    if (this.merchantIDCounter === undefined) {
      console.error('Merchant ID counter not initialized.');
      return throwError('Merchant ID counter not initialized.');
    }

    // Update the merchantID before registering the merchant
    merchant.merchantID = this.merchantIDCounter.toString().padStart(3, '0');
    this.updateMerchantIDCounter();

    // Update the URL according to your server's API
    return this.http.post<User>(`${this.apiUrl}/register-merchant`, merchant).pipe(
      catchError((error) => {
        console.error('Error in registerMerchant:', error);

        // Show an error message using MatSnackBar
        this.snackBar.open('Email or username already in use', 'Close', {
          duration: 5000, // Duration in milliseconds
        });

        return throwError(error); // Rethrow the error
      })
    );
  }

  getNextMerchantID(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/get-next-merchant-id`).pipe(
      catchError((error) => {
        console.error('Error in getNextMerchantID:', error);
        return throwError(error);
      })
    );
  }

  private fetchNextMerchantID(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/get-next-merchant-id`).pipe(
      catchError((error) => {
        console.error('Error in fetchNextMerchantID:', error);
        return throwError(error);
      })
    );
  }

  private updateMerchantIDCounter(): void {
    if (this.merchantIDCounter !== undefined) {
      this.merchantIDCounter++;
      this.fetchNextMerchantID().subscribe(
        (nextMerchantID) => (this.merchantIDCounter = parseInt(nextMerchantID)),
        (error) => console.error('Error updating merchant ID counter:', error)
      );
    }
  }

  getMerchantAccounts(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/merchant-accounts`).pipe(
      catchError((error) => {
        console.error('Error fetching merchant accounts:', error);
        return throwError(error);
      })
    );
  }
  
  approveMerchant(id: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/approve-merchant/${id}`, {}).pipe(
      catchError((error) => {
        console.error('Error approving merchant:', error);
        return throwError(error);
      })
    );
  }
  
  rejectMerchant(id: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/reject-merchant/${id}`, {}).pipe(
      catchError((error) => {
        console.error('Error rejecting merchant:', error);
        return throwError(error);
      })
    );
  }
  loginUser(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error) => {
        console.error('Error in loginUser:', error);
        return throwError(error);
      })
    );
  }
  
}