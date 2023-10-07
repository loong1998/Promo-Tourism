import { Component, OnInit } from "@angular/core";
import { Product } from "../services/products.model";
import { ProductService } from "../services/products.service";

@Component(
    {
        selector: 'app-product',
        templateUrl: './product.component.html',
        styleUrls: ['./product.component.css']
    }
)

export class ProductComponent{
    products: Product[] = [];

    constructor(public productsService: ProductService){
        
    }

    ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products; // Assign the data received from the Observable to the products array
    });
  }
}