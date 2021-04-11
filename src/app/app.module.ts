import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { MDBBootstrapModule ,DropdownModule} from 'angular-bootstrap-md';
import { NgbAlertModule,NgbNavModule, NgbPaginationModule, NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { RentalDtoComponent } from './components/rental-dto/rental-dto.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { PaymentComponent } from './components/payment/payment.component';

import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BrandGetListComponent } from './components/brand/brand-get-list/brand-get-list.component';
import { ColorGetListComponent } from './components/color/color-get-list/color-get-list.component';
import { CarGetListComponent } from './components/car/car-get-list/car-get-list.component';
import { CarDtoComponent } from './components/car-dto/car-dto.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CarImageAddComponent } from './components/car-image-add/car-image-add.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { AppReducers } from './store/app.reducer';





@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NaviComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarDtoComponent,
    RentalDtoComponent,
    FilterBrandPipe,
    FilterColorPipe,
    FilterCarPipe,
    CarFilterComponent,
    PaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarUpdateComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    LoadingSpinnerComponent,
    PasswordInputComponent,
    LogoutComponent,
    FooterComponent,
    HomePageComponent,
    AdminDashboardComponent,
    CarImageAddComponent,
    BrandGetListComponent,
    ColorGetListComponent,
    CarGetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DropdownModule,
    MDBBootstrapModule.forRoot(),
    StoreModule.forRoot(AppReducers),
    ToastrModule.forRoot(), // ToastrModule added
    NgbPaginationModule,
    NgbAlertModule,
    NgbDropdownModule,
    NgbNavModule,
    FontAwesomeModule,
    FormsModule, 
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
