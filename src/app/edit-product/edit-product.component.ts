// edit-product.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/products.service';
import { Product } from '../services/products.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  productId: string;
  product: Product;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.formBuilder.group({
      // ... other form controls ...
      imageUrl: [''], // Initialize with an empty string
    });
  }
  
    onImageSelected(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files[0]) {
          const file = inputElement.files[0];
          // Assuming you have a function to generate a data URL from the selected file.
          this.getBase64Image(file).then((dataUrl) => {
              // Update the imageUrl control with the data URL
              this.productForm.get('imageUrl').setValue(dataUrl);
              // Update the image preview
              const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;
              imagePreview.src = dataUrl;
          });
      }
    }

    // Implement a function to convert the selected file to a data URL (base64)
    getBase64Image(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }

    ngOnInit() {
      // Get the product ID from the route
      this.productId = this.route.snapshot.paramMap.get('id');
  
      // Fetch product data based on productId using your ProductService
      this.productService.getProducts().subscribe((products) => {
        this.product = products.find((product) => product.productID === this.productId);
        if (this.product) {
          // Initialize the form with fetched product data
          this.productForm = this.formBuilder.group({
            productID: [this.product.productID],
            tourTitle: [this.product.tourTitle],
            imageUrl: [this.product.imageUrl],
            descriptions: [this.product.descriptions.join('\n')],
            rating: [this.product.rating]
          });
        } else {
          // Handle the case where the product is not found
        }
      });
    }

    onSubmit() {
      // Handle the form submission, update the product data using ProductService
      const updatedProduct = this.productForm.value;
      updatedProduct.descriptions = updatedProduct.descriptions.split('\n');
      this.productService.updateProduct(this.productId, updatedProduct);
      
      this.snackBar.open('Product updated successfully!', 'Close', {
        duration: 2000, // Adjust the duration as needed
      });

      // Redirect back to the product list page or any other desired route
      this.router.navigate(['/manage-tourism-product']);
    }
}
