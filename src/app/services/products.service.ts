import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product} from './products.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ProductService{
    private apiUrl = 'http://localhost:3000/api/add-product';
    constructor(private http: HttpClient, private authService: AuthService) {}
    public products: Product[] = [
        {productID: '001', tourTitle: 'Sunset Cruise in Langkawi', imageUrl: 'assets/sunsetTour.png',
            descriptions: ["Cruise along the Langkawi waters and experience the beautiful sunset with your loved ones",
                "Watch the sunset over the tranquil Andaman Sea while enjoying dinner aboard a yacht",
                "Enjoy a set meal with a drink and cool off in the water while you cruise along the sea",
                "Catch a glimpse of spinner dolphins and flying fish during the cruise experience",
                "Take a dip into the saltwater jacuzzi, which has a trawling net attached to the boat's side and serves as a safety harness"],
            rating: 4.5, price: 45, username:"aaa"},
        {productID: '002',tourTitle: 'Pulau Payar Snorkeling Tour', imageUrl: 'assets/snorkelingTour.png',
            descriptions: ["Experience diving or snorkeling in crystal clear waters at Langkawi's most popular island in Kedah, Malaysia - Pulau Payar",
                "Catch the shark feeder in action and get a chance to swim with baby sharks that live by the shore at this marine park",
                "Visit the only place off Malaysia's west coast with exotic coral reefs and marine life similar to that of the Indian ocean",
                "See colourful coral beautifully protected, and other exotic marine species like the moray eels, clown fish, baby reef sharks, and more"],
            rating: 5, price: 80, username:"aaa"},
        {productID: '003',tourTitle: 'Wildlife Park Ticket', imageUrl: 'assets/wildlifeTour.png',
            descriptions:["Enjoy a day surrounded by Malaysia's unique flora and fauna at Langkawi Wildlife Park!",
                "Get up close and personal with the park's animals as you pet and talk to them during the feeding sessions",
                "Hear the distinctive sounds of the friendly macaws as you give them sunflower seeds and peanuts",
                "Take photos of the animals in their natural habitats, with flamingos posing and white raccoons playing around in this Langkawi bird paradise",
                "Take a break and have a laugh as you enjoy the fun animal talk show, which runs twice a day"],
            rating: 4, price: 55, username:"aaa"}
    ];

    private productSubject = new BehaviorSubject<Product[]>(this.products);

    getProducts(){
        return this.productSubject.asObservable();
    }

    getProductsArray(): Product[] {
        return this.products;
      }
      

    updateProduct(productId: string, updatedProduct: Product) {
        // Find the product to update and update it in the products array
        const index = this.products.findIndex((product) => product.productID === productId);
        if (index !== -1) {
          this.products[index] = updatedProduct;
          this.productSubject.next(this.products); // Notify subscribers of the updated data
        }
    }
    deleteProduct(productId: string): Observable<boolean> {
        // Find the product to delete and remove it from the products array
        const index = this.products.findIndex((product) => product.productID === productId);
        if (index !== -1) {
          this.products.splice(index, 1);
          this.productSubject.next(this.products); // Notify subscribers of the updated data
          return of(true); // Return an Observable indicating success
        }
        return of(false); // Return an Observable indicating failure
    }

    addProduct(productData: any): Observable<any> {
        // Retrieve the username from AuthService
        const username = this.authService.getUsername();
    
        // Add the username to the productData
        productData.username = username;
    
        return this.http.post<any>(this.apiUrl, productData);
    }

    addProductToMongo(product: Product) {
    return this.http.post<any>(`${this.apiUrl}/add-product`, product);
  }
      
}