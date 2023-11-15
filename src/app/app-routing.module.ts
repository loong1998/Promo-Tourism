// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AccountListComponent } from './account-list/account-list.component';
import { ManageTourismProductComponent } from './manage-tourism-product/manage-tourism-product.component';
import { ReviewProductComponent } from './reviewProduct/review-product.component';
import { AnalyticsReportComponent } from './analytics-report/analytics-report.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: CarouselComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account-list', component: AccountListComponent, canActivate: [AuthGuard] },
  { path: 'manage-tourism-product', component: ManageTourismProductComponent, canActivate: [AuthGuard] },
  { path: 'reviewProduct', component: ReviewProductComponent, canActivate: [AuthGuard] },
  { path: 'analyticsReport', component: AnalyticsReportComponent, canActivate: [AuthGuard] },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
