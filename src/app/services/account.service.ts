import {Account} from './account.model';
import {Injectable} from '@angular/core';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ProductService{
    private accounts : Account[] =[];

    getAccounts(){
        return this.accounts;
    }

    addAccount(username:String,merchantName:String,contactNumber:String,email:String,companyDescription:String,password:String){
        const account : Account = {username:username, merchantName:merchantName, contactNumber:contactNumber, email:email, companyDescription:companyDescription, password:password};
        this.accounts.push(account);   

    }
}