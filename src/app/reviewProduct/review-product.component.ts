import { Component, OnInit } from "@angular/core";

import { Booking } from "../services/booking.model";
import { BookingService } from "../services/booking.service";
import { ReviewProduct } from "../services/reviewProduct.model";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";

@Component(
    {
        selector: 'app-review-product',
        templateUrl: './review-product.component.html',
        styleUrls: ['./review-product.component.css']
    }
)

export class ReviewProductComponent implements OnInit{
    bookingsForReview: Booking[] = [];
    public bookingSub: Subscription | undefined;
    reviewProducts: ReviewProduct[] = [];

    loginUser;

    constructor(public bookingService: BookingService, public authService: AuthService){
        
    }

    ngOnInit(): void{
        this.loginUser = this.authService.getUsername();

        this.bookingService.getBookingForReview(this.loginUser.username);
        this.bookingSub = this.bookingService.getBookingForUpdateListener()
            .subscribe(
                (bookingsForReview: Booking[]) => {
                    this.bookingsForReview = bookingsForReview;
                }
            );
    }
}