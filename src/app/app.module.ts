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
import { PaymentComponent } from './payment/payment.component';
import { ReviewProductComponent } from './reviewProduct/review-product.component';
import { SubmitReviewComponent } from './reviewProduct/submitReview/submit-review.component';
import { AnalyticsReportComponent } from './analytics-report/analytics-report.component';
import { PaymentModalComponent } from './payment/paymentModal/payment-modal.component';
import { SubmitReviewModalComponent } from './reviewProduct/submitReview/submit-review-modal/submit-review-modal';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationSuccessDialogComponent } from './registration/registration-success-dialog/registration-success-dialog.component';
import { MerchantSuccessDialogComponent } from './registration/merchant-success-dialog/merchant-success-dialog.component';
import { AccountListComponent } from './account-list/account-list.component';
import { SaveSuccessfulDialogComponent } from './account-list/save-successful-dialog/save-successful-dialog.component';
import { RejectDialogComponent } from './account-list/reject-dialog/reject-dialog.component';
import { ManageTourismProductComponent } from './manage-tourism-product/manage-tourism-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductService } from './services/products.service';
import { AddProductComponent } from './add-product/add-product.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgChartsModule } from 'ng2-charts';


import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { ChartModule } from 'angular-highcharts';
import {NgxPrintModule} from 'ngx-print';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard



const appRoutes: Routes = [
  {path: "product", component: ProductComponent},
  {path: "home", component: CarouselComponent},
  {path: "login", component: LoginComponent },
  {path: "registration", component: RegistrationComponent},
  {path: 'account-list', component: AccountListComponent, canActivate: [AuthGuard]},
  {path: "", component: CarouselComponent},
  {path: 'productDetails/:productID', component: ProductDetailsComponent},
  {path: 'manage-tourism-product', component: ManageTourismProductComponent, canActivate: [AuthGuard]},
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: "productDetails/:productID/payment", component: PaymentComponent},
  {path: "reviewProduct", component: ReviewProductComponent, canActivate: [AuthGuard]},
  {path: "submitReview/:productID", component: SubmitReviewComponent},
  {path: "analyticsReport", component: AnalyticsReportComponent, canActivate: [AuthGuard]},
  {path: "paymentModal", component: PaymentModalComponent},
  {path: "submitReviewModal", component: SubmitReviewModalComponent}
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
    AccountListComponent,
    SaveSuccessfulDialogComponent,
    RejectDialogComponent,
    ManageTourismProductComponent,
    EditProductComponent,
    AddProductComponent,
    PaymentComponent,
    ReviewProductComponent,
    SubmitReviewComponent,
    AnalyticsReportComponent,
    PaymentModalComponent,
    SubmitReviewModalComponent
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
    MatSnackBarModule,
    NoopAnimationsModule,
    // ChartModule,
    NgxPrintModule,
    HttpClientModule,
    NgApexchartsModule,
    NgChartsModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [ProductService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
