import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../services/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private accounts: User[] = [
    { 
      merchantID :'100',
      username: 'user1',
      merchantName: 'Merchant 1',
      contactNumber: '1234567890',
      email: 'user1@example.com',
      companyDescription: 'Company description 1',
      password: 'password1',
      pdfFile: 'path/to/pdf1.pdf',
      status: 'pending',
      expanded: false,
    },
    { 
      merchantID :'101',
      username: 'user2',
      merchantName: 'Merchant 2',
      contactNumber: '9876543210',
      email: 'user2@example.com',
      companyDescription: 'Company description 2',
      password: 'password2',
      pdfFile: 'path/to/pdf2.pdf',
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
