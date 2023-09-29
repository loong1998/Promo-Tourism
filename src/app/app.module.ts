import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationSuccessDialogComponent } from './registration/registration-success-dialog/registration-success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './registration/file-upload-dialog/file-upload-dialog.component';




const appRoutes: Routes = [
  {path: "product", component: ProductComponent},
  {path: "home", component: CarouselComponent},
  {path: "login", component: LoginComponent },
  {path: "registration", component: RegistrationComponent}
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
    FileUploadDialogComponent,
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
