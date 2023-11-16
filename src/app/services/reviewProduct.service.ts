import {Injectable} from '@angular/core';
import { ReviewProduct } from './reviewProduct.model';
import { PaidProduct } from './reviewProduct.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class ReviewProductService{
    private reviewProducts: ReviewProduct[] = [];
    private paidProducts: PaidProduct[] = [];
    private reviewUpdated = new Subject<ReviewProduct[]>();

    constructor(public authService: AuthService, private http: HttpClient){}

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
        const newReview: ReviewProduct = {reviewID: "", productID:productID, review:review};

        this.http.post<{message: string, reviewID: string}>('http://localhost:3000/api/review', newReview)
            .subscribe(
                (response) => {
                    console.log(response.message);
                    const reviewID = response.reviewID;
                    newReview.reviewID=reviewID;
                    this.reviewProducts.push(newReview);
                    this.reviewUpdated.next([...this.reviewProducts]);
                }
            )
    }
}