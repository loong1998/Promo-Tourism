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
  noRecords: boolean = false; // Initialize as false

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.noRecords = this.products.length === 0;
    });
  }
  
  addNewProduct() {
    this.router.navigate(['/add-product']);
  }

  editProduct(product: Product) {
    this.router.navigate(['/edit-product', product.productID]);
  }

  deleteProduct(product: Product) {
    // Display a confirmation dialog to confirm deletion
    const confirmDelete = window.confirm(`Are you sure you want to delete ${product.tourTitle}?`);
  
    if (confirmDelete) {
      this.productService.deleteProduct(product.productID).subscribe(
        (success) => {
          if (success) {
            // Product deleted successfully, you can update your local product list if needed
          } else {
            // Handle deletion failure (e.g., show an error message)
          }
        },
        (error) => {
          // Handle error here (e.g., show an error message)
        }
      );
    }
  }
  
  
  
}
