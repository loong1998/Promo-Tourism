import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product/productDetails/product-details.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationSuccessDialogComponent } from './registration/registration-success-dialog/registration-success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MerchantSuccessDialogComponent } from './registration/merchant-success-dialog/merchant-success-dialog.component';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReviewMerchantRegistrationComponent } from './review-merchant-registration/review-merchant-registration.component';
import { ReviewMerchantDetailsComponent } from './review-merchant-registration/review-merchant-details/review-merchant-details.component';
import { AccountListComponent } from './account-list/account-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';




const appRoutes: Routes = [
  {path: "product", component: ProductComponent},
  {path: "home", component: CarouselComponent},
  {path: "login", component: LoginComponent },
  {path: "registration", component: RegistrationComponent},
  {path: "review-merchant-registration", component: ReviewMerchantRegistrationComponent},
  {path: "account-list", component:AccountListComponent},
  {path: "", component: CarouselComponent},
  {path: 'productDetails/:productID', component: ProductDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    ProductComponent,
    LoginComponent,
    RegistrationComponent,
    RegistrationSuccessDialogComponent,
    MerchantSuccessDialogComponent,
    ProductDetailsComponent,
    ReviewMerchantRegistrationComponent,
    ReviewMerchantDetailsComponent,
    AccountListComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSnackBar,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
