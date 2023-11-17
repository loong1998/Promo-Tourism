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

export class ProductComponent implements OnInit{
  //declare an empty array to hold Product object
  products: Product[] = [];

  //initailize product service variable
  constructor(public productsService: ProductService){
      
  }

  ngOnInit(): void {
    //get all product object and store in products array
    // this.products = this.productsService.getProductsArray();
    this.productsService.getAllProducts();
    this.productsService.getProductUpdateListener().subscribe(
      (products: Product[]) => {
          this.products = products;
      }
    );
  }

}