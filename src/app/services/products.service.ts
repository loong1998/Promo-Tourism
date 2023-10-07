import {Injectable} from '@angular/core';
import {Product} from './products.model';
import { BehaviorSubject } from 'rxjs';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ProductService{
    public products: Product[] = [
        {productID: '001', tourTitle: 'Sunset Cruise in Langkawi', imageUrl: 'assets/sunsetTour.png',
            descriptions: ["Cruise along the Langkawi waters and experience the beautiful sunset with your loved ones",
                "Watch the sunset over the tranquil Andaman Sea while enjoying dinner aboard a yacht",
                "Enjoy a set meal with a drink and cool off in the water while you cruise along the sea",
                "Catch a glimpse of spinner dolphins and flying fish during the cruise experience",
                "Take a dip into the saltwater jacuzzi, which has a trawling net attached to the boat's side and serves as a safety harness"],
            rating: 4.5},
        {productID: '002',tourTitle: 'Pulau Payar Snorkeling Tour', imageUrl: 'assets/snorkelingTour.png',
            descriptions: ["Experience diving or snorkeling in crystal clear waters at Langkawi's most popular island in Kedah, Malaysia - Pulau Payar",
                "Catch the shark feeder in action and get a chance to swim with baby sharks that live by the shore at this marine park",
                "Visit the only place off Malaysia's west coast with exotic coral reefs and marine life similar to that of the Indian ocean",
                "See colourful coral beautifully protected, and other exotic marine species like the moray eels, clown fish, baby reef sharks, and more"],
            rating: 5},
        {productID: '003',tourTitle: 'Wildlife Park Ticket', imageUrl: 'assets/wildlifeTour.png',
            descriptions:["Enjoy a day surrounded by Malaysia's unique flora and fauna at Langkawi Wildlife Park!",
                "Get up close and personal with the park's animals as you pet and talk to them during the feeding sessions",
                "Hear the distinctive sounds of the friendly macaws as you give them sunflower seeds and peanuts",
                "Take photos of the animals in their natural habitats, with flamingos posing and white raccoons playing around in this Langkawi bird paradise",
                "Take a break and have a laugh as you enjoy the fun animal talk show, which runs twice a day"],
            rating: 4 },
    ];

    private productSubject = new BehaviorSubject<Product[]>(this.products);

    getProducts(){
        return this.productSubject.asObservable();
    }

    updateProduct(productId: string, updatedProduct: Product) {
        // Find the product to update and update it in the products array
        const index = this.products.findIndex((product) => product.productID === productId);
        if (index !== -1) {
          this.products[index] = updatedProduct;
          this.productSubject.next(this.products); // Notify subscribers of the updated data
        }
    }
}