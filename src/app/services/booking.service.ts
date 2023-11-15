import {Injectable} from '@angular/core';
import { Booking } from './booking.model';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class BookingService{
    public bookings: Booking[] = [];
    public bookingUpdated = new Subject<Booking[]>();
    public totalPrice: number;

    constructor(private http: HttpClient){}

    getAllBooking(){
        return this.bookings;
    }

    addBooking(productID: string, tourTitle: string, numOfPax: number, contactNum: string,
        visitDate: Date, totalPrice: number, username: string){
        const newBooking: Booking = {bookingID: '', productID: productID, tourTitle:tourTitle,
            numOfPax: numOfPax, contactNum: contactNum, visitDate: visitDate,
            totalPrice: totalPrice, username: username};
            
            this.http.post<{message: string, bookingID: string}>('http://localhost:3000/api/booking', newBooking)
            .subscribe((response) => {
                console.log(response.message);
                const bookingID = response.bookingID;
                newBooking.bookingID = bookingID;
                this.bookings.push(newBooking);
            })

            this.bookings.push(newBooking);
            console.log(this.bookings);
    }

    getLastBooking(){
        return this.bookings[this.bookings.length - 1];
    }

    getBookings(){
        this.http.get<{message: string, bookings: any}>('http://localhost:3000/api/getLastBooking')
            .pipe(map(
                (bookingData) => {
                    return bookingData.bookings.map(booking =>{
                        return {
                            productID: booking.productID,
                            tourTitle: booking.tourTitle,
                            numOfPax: booking.numOfPax,
                            contactNum: booking.contactNum,
                            visitDate: booking.visitDate,
                            totalPrice: booking.totalPrice,
                            username: booking.username,
                            bookingID: booking._id
                        };
                    });
                }
            ))
            .subscribe(transformedBooking => {
                this.bookings= transformedBooking;
                this.bookingUpdated.next([...this.bookings]);
            })
    }
    
    getBookingUpdateListener(){
        return this.bookingUpdated.asObservable();
    }
}