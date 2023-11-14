import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Booking } from "../services/booking.model";
import { BookingService } from "../services/booking.service";
import { ReviewProductService } from "../services/reviewProduct.service";
import { PaidProduct } from "../services/reviewProduct.model";
import { ProductService } from "../services/products.service";
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { PaymentModalComponent } from "./paymentModal/payment-modal.component";

@Component(
    {
        selector: 'app-payment',
        templateUrl: './payment.component.html',
        styleUrls: ['./payment.component.css']
    }
)

export class PaymentComponent implements OnInit{
    public booking: Booking[] = [];
    public paidProducts: PaidProduct[] = [];

    lastBooking: any;
    product: any;
    tourName: string;

    constructor(public activatedRouted: ActivatedRoute,
        public bookingService: BookingService,
        public ReviewProductService: ReviewProductService,
        public productService: ProductService,
        public router: Router, public matDialog: MatDialog){

    }

    ngOnInit(): void{
        this.lastBooking = this.bookingService.getLastPurchaseProduct();

        this.product = this.productService.getProductsArray()
            .find(p => p.productID === this.lastBooking.productID)
        console.log(this.product);
        this.tourName = this.product.tourTitle;
        console.log(this.tourName);
        // this.booking.push(this.bookingService.getLastPurchaseProduct());
    }

    openModal(){
        this.matDialog.open(PaymentModalComponent, {
            width: '500px'
        })
    }

    onPay(form:NgForm){
        if(form.invalid){
            return;
        }

        this.router.navigate(['/home'])
    }
}