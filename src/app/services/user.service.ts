import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../services/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private accounts: User[] = [
    { 
      merchantID :'001',
      username: 'user1',
      merchantName: 'Merchant 1',
      contactNumber: '+60123456789',
      email: 'user1@example.com',
      companyDescription: 'Company description 1',
      password: 'password1@',
      pdfFile: 'assets/sample.pdf',
      status: 'pending',
      expanded: false,
    },
    { 
      merchantID :'002',
      username: 'user2',
      merchantName: 'Merchant 2',
      contactNumber: '+60123456789',
      email: 'user2@example.com',
      companyDescription: 'Company description 2',
      password: 'password2@',
      pdfFile: 'assets/sample.pdf',
      status: 'pending',
      expanded: false,
    },
  ];
  private accountsSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.accounts);
  private merchantIDCounter: number = 0;
  constructor() {}

  getAccounts(): Observable<User[]> {
    return this.accountsSubject.asObservable();
  }

  addAccount(account: User) {
    this.merchantIDCounter++;
    const merchantID = `00${this.merchantIDCounter}`.slice(-3); // Format as '001', '002', etc.
    account.merchantID = merchantID;
    this.accounts.push(account);
    this.accountsSubject.next(this.accounts);
  }
}
