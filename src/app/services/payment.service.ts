import {Injectable} from '@angular/core';
import { Payment } from './payment.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class PaymentService{
    constructor(private http: HttpClient){

    }

    payments: Payment[] = [];
    paymentUpdated = new Subject<Payment[]>();

    addPayment(creditCardNum: string, expDate: string, cvv: string,
        bookingID: string, productID: string, tourTitle: string,
        totalPrice: number, username: string){
        
            const payment: Payment = {paymentID: "", creditCardNum:creditCardNum, expDate:expDate,
                cvv:cvv, bookingID:bookingID, productID:productID, tourTitle:tourTitle,
                totalPrice:totalPrice, username:username};
            
                console.log(payment);

            this.http.post<{message: string, paymentID: string}>('http://localhost:3000/api/payment', payment)
                .subscribe(
                    (response) => {
                        console.log(response.message);
                        const paymentID = response.paymentID;
                        payment.paymentID = paymentID;
                        this.payments.push(payment);
                        this.paymentUpdated.next([...this.payments]);
                    }
                )
    }
}