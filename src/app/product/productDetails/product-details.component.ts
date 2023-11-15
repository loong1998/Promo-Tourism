import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../services/products.service";
import { Booking } from "src/app/services/booking.model";
import { BookingService } from "src/app/services/booking.service";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component(
    {
        selector: 'app-product-details',
        templateUrl: './product-details.component.html',
        styleUrls: ['./product-details.component.css']
    }
)

export class ProductDetailsComponent implements OnInit{
    products;
    selectedProductID;

    productDescs = [];

    bookingDetails: Booking[] = [];

    pax: number = 0;
    totalPrice: number = 0;
    username: any;

    constructor(public activatedRouted: ActivatedRoute,
        public productsService: ProductService,
        public bookingService: BookingService,
        public authService: AuthService,
        public router: Router){

    }

    ngOnInit(): void{
        this.username = this.getUsername();
        //get the selected product's productID and store in selectedProductID
        this.selectedProductID = this.activatedRouted.snapshot.paramMap.get('productID');

        //find the selected productID that match with the existing productID and store the product object
        //in products variable
        this.products = this.productsService.products.find(x => x.productID == this.selectedProductID);

        //get the product's description and store in productdesc variable
        this.splitDesc();
    }

    onConfirmBookingDetails(form: NgForm){
        //perform validation
        if(form.invalid){
            return;
        }

        this.bookingService.addBooking(this.products.productID, form.value.numOfPax,
            form.value.contactNum, form.value.visitDate, this.totalPrice,
            this.username);
            
        this.router.navigate(['/productDetails/{{products.productID}}/payment'])
        form.resetForm();
    }

    //calculate the total price of the tour based on the tour price and number of person
    calculateTotalPrice(){
        return this.totalPrice = this.products.price * this.pax;
    }

    getUsername(){
        return this.authService.getLoginUser().username;
    }

    splitDesc(){
        if(this.products.descriptions != null){
            this.productDescs = this.products.descriptions;
        }
    }
}