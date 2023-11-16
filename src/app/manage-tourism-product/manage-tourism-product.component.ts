// manage-tourism-product.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from "../services/products.service";
import { Product } from '../services/products.model'; // Import the Product model
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-manage-tourism-product',
  templateUrl: './manage-tourism-product.component.html',
  styleUrls: ['./manage-tourism-product.component.css']
})
export class ManageTourismProductComponent implements OnInit {
  products: Product[]; // Declare an array to store products
  loggedInUsername: string;
  noRecords: boolean = false; // Initialize as false

  constructor(private productService: ProductService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loggedInUsername = this.authService.getUsername();
    this.loadProductsByLoggedInUser();
  }

  loadProductsByLoggedInUser() {
    this.productService.getProductsByUsername(this.loggedInUsername).subscribe((products) => {
        this.products = products;
        this.noRecords = this.products.length === 0;
    });
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
  onDelete(productID: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    
    if (confirmDelete) {
      this.productService.deleteProduct(productID).subscribe(
        (response) => {
          // Handle successful deletion
          console.log('Product deleted:', response);
          // Remove the deleted product from the local array
          this.products = this.products.filter(product => product.productID !== productID);
        },
        (error) => {
          // Handle deletion error
          console.error('Deletion failed:', error);
          // Optionally, show an error message to the user
        }
      );
    } else {
      // Deletion canceled by the user
      console.log('Deletion canceled');
      // Optionally, show a message indicating deletion was canceled
    }
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
