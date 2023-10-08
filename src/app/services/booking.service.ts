import {Injectable} from '@angular/core';
import { Booking } from './booking.model';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class BookingService{
    public bookings: Booking[] = [];
    public totalPrice: number;

    //private bookingDetails: new BehaviorSubject<PurchaseProduct[]> = new BehaviorSubject<PurchaseProduct[]>([])

    getPurchaseProduct(){
        return this.bookings;
    }

    addPurchaseProduct(productID:string, tourName:string, imageUrl: string, numOfPax:number, contactNum:string, visitDate:Date, totalPrice:number){
        const booking: Booking = {productID:productID, tourName:tourName, imageUrl:imageUrl, numOfPax:numOfPax, contactNum:contactNum,
            visitDate:visitDate, totalPrice:totalPrice};
            
        this.bookings.push(booking);
    }

    getLastPurchaseProduct(){
        return this.bookings[this.bookings.length - 1];
    }

    
}