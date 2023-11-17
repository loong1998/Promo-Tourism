import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "src/app/services/products.model";
import { ProductService } from "../../services/products.service";
import { Booking } from "src/app/services/booking.model";
import { BookingService } from "src/app/services/booking.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

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
    selectedProductIDSub: Subscription;

    product: Product[] = [];
    public productSub: Subscription | undefined;

    productDescs = [];

    bookingDetails: Booking[] = [];

    pax: number = 0;
    totalPrice: number = 0;
    username;
    price;
    priceSub: Subscription;
    tourTitle;
    tourTitleSub: Subscription;
    merchantName;
    merchantNameSub: Subscription;
    

    constructor(public activatedRouted: ActivatedRoute,
        public productsService: ProductService,
        public bookingService: BookingService,
        public router: Router){

    }

    ngOnInit(): void{
        //get the selected product's productID and store in selectedProductID
        this.selectedProductID = this.activatedRouted.snapshot.paramMap.get('productID');
        this.products = this.productsService.products.find(p => p.productID === this.selectedProductID);

        this.splitDesc();
        console.log(this.selectedProductID);

        this.productsService.getSelectedProduct(this.selectedProductID);
        this.productSub = this.productsService.getSelectedProductUpdateListener()
            .subscribe(
                (product: Product[]) => {
                    this.product = product;
                }
            ); 

        this.priceSub = this.productsService.getPrice().subscribe((price: number) => {
            this.price = price;
          });

          this.tourTitleSub = this.productsService.getTourTitle().subscribe((tourTitle: string) => {
            this.tourTitle = tourTitle;
          });
    }

    onConfirmBookingDetails(form: NgForm){
        //perform validation
        if(form.invalid){
            return;
        }

        this.bookingService.addBooking(this.selectedProductID, this.products.tourTitle, form.value.numOfPax,
            form.value.contactNum, form.value.visitDate, this.totalPrice,
            this.username, this.products.merchantName);
            
        this.router.navigate(['/productDetails/{{products.productID}}/payment'])
        form.resetForm();
    }

    //calculate the total price of the tour based on the tour price and number of person
    calculateTotalPrice(){
        return this.totalPrice = this.products.price * this.pax;
    }

    splitDesc(){
        if(this.products.descriptions != null){
            this.productDescs = this.products.descriptions;
        }
    }
}