import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { BrandGetListComponent } from './components/brand/brand-get-list/brand-get-list.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { ColorGetListComponent } from './components/color/color-get-list/color-get-list.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalDtoComponent } from './components/rental-dto/rental-dto.component';
import { RentalComponent } from './components/rental/rental.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { CarImageAddComponent } from './components/car-image-add/car-image-add.component';
import { CarDtoComponent } from './components/car-dto/car-dto.component';
import { CarGetListComponent } from './components/car/car-get-list/car-get-list.component';

const routes: Routes = [
  { path: 'rentals', component: RentalComponent },
  { path: 'rental/details', component: RentalDtoComponent },
  { path: 'payment/:rental', component: PaymentComponent, canActivate: [LoginGuard] },
  { path: 'customers', component: CustomerComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/details/:carId', component: CarDtoComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'colors', component: ColorComponent },
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent, canActivate: [LoginGuard] },
  { path: 'loading-spinner', component: LoadingSpinnerComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'footer', component: FooterComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: 'brands/getlist', component: BrandGetListComponent },
      { path: 'brands/add', component: BrandAddComponent },
      { path: 'brands/:brandId', component: BrandUpdateComponent, },
      { path: 'cars/getlist', component: CarGetListComponent },
      { path: 'cars/add', component: CarAddComponent },
      { path: 'cars/:carId', component: CarUpdateComponent },
      { path: 'cars/image/getlist', component: CarUpdateComponent },
      { path: 'cars/image/add', component: CarImageAddComponent },
      { path: 'cars/image/update', component: CarUpdateComponent },
      { path: 'colors/getlist', component: ColorGetListComponent },
      { path: 'colors/add', component: ColorAddComponent },
      { path: 'colors/:colorId', component: ColorUpdateComponent },
    ]
  },
  { path: '**', redirectTo: 'cars', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
