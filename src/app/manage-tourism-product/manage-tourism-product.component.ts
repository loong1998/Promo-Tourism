// manage-tourism-product.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from "../services/products.service";
import { Product } from '../services/products.model'; // Import the Product model
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-tourism-product',
  templateUrl: './manage-tourism-product.component.html',
  styleUrls: ['./manage-tourism-product.component.css']
})
export class ManageTourismProductComponent implements OnInit {
  products: Product[]; // Declare an array to store products

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  addNewProduct() {
    // Implement logic to add a new product (e.g., navigate to a form)
  }

  editProduct(product: Product) {
    // Implement logic to edit a product (e.g., navigate to an edit form)
    this.router.navigate(['/edit-product', product.productID]);
  }

  deleteProduct(product: Product) {
    // Implement logic to delete a product (e.g., show a confirmation dialog)
  }
}
