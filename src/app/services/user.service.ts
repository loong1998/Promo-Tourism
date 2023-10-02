import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../services/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private accounts: User[] = [];
  private accountsSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor() {}

  getAccounts(): Observable<User[]> {
    return this.accountsSubject.asObservable();
  }

  addAccount(account: User) {
    this.accounts.push(account);
    this.accountsSubject.next(this.accounts);
  }
}
