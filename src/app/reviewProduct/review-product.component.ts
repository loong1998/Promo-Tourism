import { Component, OnInit } from "@angular/core";

import { Booking } from "../services/booking.model";
import { BookingService } from "../services/booking.service";

@Component(
    {
        selector: 'app-review-product',
        templateUrl: './review-product.component.html',
        styleUrls: ['./review-product.component.css']
    }
)

export class ReviewProductComponent implements OnInit{
    bookings: Booking[] = [];

    constructor(public bookingService: BookingService){
        
    }

    ngOnInit(): void{
        this.bookings = this.bookingService.getPurchaseProduct();
    }
}