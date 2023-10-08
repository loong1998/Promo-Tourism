import { Component, OnInit, NgModule, Inject } from "@angular/core";
import { PaidProduct } from "../services/reviewProduct.model";
import { ReviewProductService } from "../services/reviewProduct.service";
import { ReviewProduct } from "../services/reviewProduct.model";
import { DatePipe } from '@angular/common';

import { Booking } from "../services/booking.model";
import { BookingService } from "../services/booking.service";

@Component(
    {
        selector: 'app-review-product',
        templateUrl: './review-product.component.html',
        styleUrls: ['./review-product.component.css']
    }
)

export class ReviewProductComponent{
    // public paidProducts: PaidProduct[] = [];
    bookings: Booking[] = [];
    reviewProducts: ReviewProduct[] = [];

    // bookings1 = [
    //     {tourName: "adad", imageUrl: 'assets/sunsetTour.png', numOfPax: 2,
    //         contactNum: 1, visitDate: null, totalPrice: 100}
    // ]

    constructor(public bookingService: BookingService, public reviewProductService: ReviewProductService){
        
    }

    ngOnInit(): void{
        // this.paidProducts = this.reviewProductService.getPaidProducts();
        // this.bookings.push(this.bookings1);

        this.bookings = this.bookingService.getPurchaseProduct();
        this.reviewProducts = this.reviewProductService.getReviewProducts();
    }
}