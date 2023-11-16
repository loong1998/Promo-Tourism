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

export class ReviewProductComponent implements OnInit {
    bookingsForReview: Booking[] = [];
    loginUser: string | undefined; // Define loginUser as a string
    reviewProducts: ReviewProduct[] = [];
    
    constructor(public bookingService: BookingService, public authService: AuthService) {}

    ngOnInit(): void {
        this.loginUser = this.authService.getUsername();

        if (this.loginUser) {
            this.bookingService.getBookingForReview(this.loginUser);
            this.bookingService.getBookingForUpdateListener().subscribe(
                (bookingsForReview: Booking[]) => {
                    this.bookingsForReview = bookingsForReview;
                }
            );
        }
    }
}
