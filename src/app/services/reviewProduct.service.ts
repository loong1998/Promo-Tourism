import {Injectable} from '@angular/core';
import { ReviewProduct } from './reviewProduct.model';
import { PaidProduct } from './reviewProduct.model';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ReviewProductService{
    private reviewProducts: ReviewProduct[] = [];
    private paidProducts: PaidProduct[] = [];

    getPaidProducts(){
        return this.paidProducts;
    }

    addPaidProduct(tourName:string){
        const paidProduct: PaidProduct = {tourName:tourName};
        
        this.paidProducts.push(paidProduct);
    }

    getReviewProducts(){
        return this.reviewProducts;
    }

    addReviewProduct(productID:string,  review: string){
        const reviewProduct: ReviewProduct = {productID:productID, review:review};
        this.reviewProducts.push(reviewProduct);
    }
}