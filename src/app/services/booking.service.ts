import {Injectable} from '@angular/core';
import { Booking } from './booking.model';
import { HttpClient } from '@angular/common/http';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class BookingService{
    public bookings: Booking[] = [];
    public totalPrice: number;

    constructor(private http: HttpClient){}

    getPurchaseProduct(){
        return this.bookings;
    }

    addBooking(productID: string, numOfPax: number, contactNum: string,
        visitDate: Date, totalPrice: number, username: string){
        const newBooking: Booking = {bookingID: '', productID: productID,
            numOfPax: numOfPax, contactNum: contactNum, visitDate: visitDate,
            totalPrice: totalPrice, username: username};
            
            this.http.post<{message: string, bookingID: string}>('http://localhost:3000/api/booking', newBooking)
            .subscribe((response) => {
                console.log(response.message);
                const bookingID = response.bookingID;
                newBooking.bookingID = bookingID;
                this.bookings.push(newBooking);
            })
    }

    getLastPurchaseProduct(){
        return this.bookings[this.bookings.length - 1];
    }

    
}