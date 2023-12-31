import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BookingService } from "src/app/services/booking.service";
import { ReviewProductService } from "src/app/services/reviewProduct.service";
import { ProductService } from "src/app/services/products.service";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { SubmitReviewModalComponent } from "./submit-review-modal/submit-review-modal";

@Component(
    {
        selector: "app-submit-review",
        templateUrl:"./submit-review.component.html",
        styleUrls: ["./submit-review.component.css"]
    }
)

export class SubmitReviewComponent implements OnInit{
    product;
    selectedBookingProductID;

    constructor(public activatedRouted: ActivatedRoute,
        public bookingService: BookingService,
        public reviewProductService: ReviewProductService,
        public productService: ProductService,
        public router: Router, public matDialog: MatDialog){

    }

    ngOnInit(): void {
        this.selectedBookingProductID = this.activatedRouted.snapshot.paramMap.get('productID');
        this.product = this.productService.getProductsArray().find(x => x.productID === this.selectedBookingProductID);
    }

    onSubmitReview(form: NgForm){
         if(form.invalid){
            return;
         }

         this.reviewProductService.addReviewProduct(this.product.productID, form.value.reviewInput);
         form.reset();
         this.router.navigate(['/home'])

    }

    openModal(){
        this.matDialog.open(SubmitReviewModalComponent, {
            width: '500px'
        })
    }
}