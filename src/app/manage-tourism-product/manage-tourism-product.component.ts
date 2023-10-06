// manage-tourism-product.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from "../services/products.service";
import { Product } from '../services/products.model'; // Import the Product model

@Component({
  selector: 'app-manage-tourism-product',
  templateUrl: './manage-tourism-product.component.html',
  styleUrls: ['./manage-tourism-product.component.css']
})
export class ManageTourismProductComponent implements OnInit {
  products: Product[]; // Declare an array to store products

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // Fetch the list of products from the ProductService
    this.products = this.productService.getProducts();
  }

  addNewProduct() {
    // Implement logic to add a new product (e.g., navigate to a form)
  }

  editProduct(product: Product) {
    // Implement logic to edit a product (e.g., navigate to an edit form)
  }

  deleteProduct(product: Product) {
    // Implement logic to delete a product (e.g., show a confirmation dialog)
  }
}
