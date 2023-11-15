import { Component, OnInit } from "@angular/core";
import { ActivatedRoute,Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Booking } from "../services/booking.model";
import { BookingService } from "../services/booking.service";
import { ReviewProductService } from "../services/reviewProduct.service";
import { PaidProduct } from "../services/reviewProduct.model";
import { ProductService } from "../services/products.service";
import { MatDialog } from "@angular/material/dialog";
import { PaymentModalComponent } from "./paymentModal/payment-modal.component";
import { PaymentService } from "../services/payment.service";
import { Subscription } from "rxjs";

@Component(
    {
        selector: 'app-payment',
        templateUrl: './payment.component.html',
        styleUrls: ['./payment.component.css']
    }
)

export class PaymentComponent implements OnInit{
    product
    public bookings: Booking[] = [];
    public paidProducts: PaidProduct[] = [];
    public bookingSub: Subscription | undefined;

    lastBooking: Booking[] = [];
    tourName: string;

    constructor(public activatedRouted: ActivatedRoute,
        public bookingService: BookingService,
        public ReviewProductService: ReviewProductService,
        public productService: ProductService,
        public paymentService: PaymentService,
        public router: Router, public matDialog: MatDialog){

    }

    ngOnInit(): void{
        this.bookingService.getBookings();
        this.bookingSub = this.bookingService.getBookingUpdateListener()
            .subscribe(
                (bookings: Booking[]) => {
                    this.bookings = bookings;
                }
            );

        this.lastBooking.push(this.bookingService.getLastBooking());
        console.log(this.lastBooking);
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

        this.paymentService.addPayment(form.value.creditCardNumInput,
            form.value.expDateInput, form.value.cvvInput,
            this.lastBooking[0].bookingID, this.lastBooking[0].productID,
            this.lastBooking[0].tourTitle, this.lastBooking[0].totalPrice,
            this.lastBooking[0].username);
        this.router.navigate(['/home'])
    }
}