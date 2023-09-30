import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../services/products.model";
import { ProductService } from "../../services/products.service";

@Component(
    {
        selector: 'app-product-details',
        templateUrl: './product-details.component.html',
        styleUrls: ['./product-details.component.css']
    }
)

export class ProductDetailsComponent{
    products;
    selectedProductID;
    // productID;

    productDescs = [];

    constructor(public activatedRouted: ActivatedRoute, public productsService: ProductService){

    }

    ngOnInit(): void{
        // this.products = this.productsService.getProducts();
        
        this.selectedProductID = this.activatedRouted.snapshot.paramMap.get('productID');
        this.products = this.productsService.products.find(x => x.productID == this.selectedProductID);

        this.splitDesc();
    }

    splitDesc(){
        if(this.products.descriptions != null){
            this.productDescs = this.products.descriptions;
            //console.log(this.productDescs);
        }
    }
}