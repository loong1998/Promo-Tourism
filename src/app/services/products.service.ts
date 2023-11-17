import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product} from './products.model';
import { BehaviorSubject, Observable, of, Subject, map} from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, tap } from 'rxjs/operators';



@Injectable(
    {
        providedIn: 'root'
    }
)

export class ProductService{
    private apiUrl = 'http://localhost:3000/api/add-product';
    constructor(private http: HttpClient, private authService: AuthService) {}
    public products: Product[] = [];
    public productUpdated = new Subject<Product[]>();

    public selectedProduct: Product[] = [];
    public selectedProductUpdate = new Subject<Product[]>();
    private productIDSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    productID$: Observable<string> = this.productIDSubject.asObservable();

    private productSubject = new BehaviorSubject<Product[]>(this.products);

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/products`);
    }

    getAllProducts(){
        this.http.get<{products: any}>(`http://localhost:3000/api/getAllProduct`)
            .pipe(map(
                (productData) => {
                    return productData.products.map(product =>{
                        return {
                            productID: product.productID,
                            tourTitle: product.tourTitle,
                            imageUrl: product.imageUrl,
                            description: product.description,
                            rating: product.rating,
                            price: product.price,
                            username: product.username,
                        };
                    });
                }
            ))
            .subscribe(transformedProduct => {
                this.products= transformedProduct;
                this.productUpdated.next([...this.products]);
            })
    }
    getProductUpdateListener(){
        return this.productUpdated.asObservable();
    }

    getSelectedProduct(productID: string){
        this.http.get<{products: any}>(`http://localhost:3000/api/productDetails/` + productID)
            .pipe(map(
                (productData) => {
                    return productData.products.map(product =>{
                        return {
                            productID: product.productID,
                            tourTitle: product.tourTitle,
                            imageUrl: product.imageUrl,
                            description: product.description,
                            rating: product.rating,
                            price: product.price,
                            username: product.username,
                        };
                    });
                }
            ))
            .subscribe(transformedProduct => {
                this.selectedProduct= transformedProduct;
                this.selectedProductUpdate.next([...this.selectedProduct]);
            })
    }

    getSelectedProductUpdateListener(){
        return this.selectedProductUpdate.asObservable();
    }

    setProductID(productID: string) {
        this.productIDSubject.next(productID);
    }

    getProductID(): Observable<string> {
    // Logic to retrieve user type and return as an Observable
    return this.productID$;
    }

    getProductsArray(): Product[] {
        return this.products;
    }

      getProductsByUsername(username: string): Observable<Product[]> {
        return this.http.get<Product[]>(`http://localhost:3000/api/products/${username}`);
    }
      

    updateProduct(productID: string, product: Product): Observable<any> {
        return this.http.put<any>(`http://localhost:3000/api/products/${productID}`, product);
    }

    deleteProduct(productID: string): Observable<any> {
        const url = `http://localhost:3000/api/products/${productID}`;
        return this.http.delete<any>(url);
    }      
    
    getProductById(productID: string): Observable<Product> {
        // Implement logic to fetch a single product by its ID
        // For example, make an HTTP request to retrieve the product
        const url = `http://localhost:3000/api/products/${productID}`;
        return this.http.get<Product>(url);
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