import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Booking } from "../services/booking.model";
import { BookingService } from "../services/booking.service";
import { ReviewProductService } from "../services/reviewProduct.service";
import { PaidProduct } from "../services/reviewProduct.model";
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

    tourName: string;
    // dateFormat = formatDate(this.PurchaseProduct.visitDate, 'dd-MM-yyyy', this.locale);

    constructor(public activatedRouted: ActivatedRoute,
        public BookingService: BookingService, public ReviewProductService: ReviewProductService,
        public router: Router, public matDialog: MatDialog){

    }

    ngOnInit(): void{
        // dateFormat = formatDate(this.purchaseProduct.visitDate, 'dd-MM-yyyy', this.locale);
        this.booking.push(this.BookingService.getLastPurchaseProduct());
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

        // this.BookingService.addPurchaseProduct(this.);
        this.router.navigate(['/home'])
    }
}