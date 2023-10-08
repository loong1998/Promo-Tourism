import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from "../services/products.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../services/products.model'; // Import the Product model
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  imageFile: File | null = null;
  imageSelected = false;
  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.formBuilder.group({
      tourTitle: ['', Validators.required], // Tour title is required
      imageUrl: ['', Validators.required], // Image URL is required
      descriptions: ['', Validators.required], // Descriptions is required
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
        this.imageSelected = true;
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

  ngOnInit() {}

  onSubmit() {
    this.formSubmitted = true;
    if (this.productForm.valid) {
      // Replace 'your-logic-to-generate-unique-id' with your actual logic
      const newProductId = this.generateProductId();
  
      const newProduct: Product = {
        productID: newProductId,
        tourTitle: this.productForm.value.tourTitle,
        imageUrl: this.productForm.value.imageUrl,
        descriptions: this.productForm.value.descriptions.split('\n'),
        rating: 0, // Set a default rating (you can change it as needed)
        price: 50
      };
  
      this.productService.addProduct(newProduct);
      this.snackBar.open('Product updated successfully!', 'Close', {
        duration: 2000,
      });
      this.router.navigate(['/manage-tourism-product']);
    }
  }
  
  generateProductId(): string {
    // Retrieve the products from the ProductService as an array
    const products = this.productService.getProductsArray();
  
    if (products && products.length > 0) {
      const productIds = products.map((product) => parseInt(product.productID, 10));
      const maxProductId = Math.max(...productIds);
      return (maxProductId + 1).toString().padStart(3, '0');
    } else {
      // If there are no existing products, start from '001'
      return '001';
    }
  }
  // Create a method to check if a field should display an error message
displayError(fieldName: string): boolean {
  const control = this.productForm.get(fieldName);
  return this.formSubmitted && control && control.invalid && control.touched;
}

  onCancel() {
    // Navigate back to the previous page
    this.router.navigate(['/manage-tourism-product'], { relativeTo: this.route });
  }
  
  
}
