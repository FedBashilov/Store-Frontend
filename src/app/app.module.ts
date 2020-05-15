import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';


import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { SuccessfulOrderDialogComponent } from './components/successful-order-dialog/successful-order-dialog.component';
import { MovingMenuComponent } from './components/moving-menu/moving-menu.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ClientAccountComponent } from './components/client-account/client-account.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    routingComponents,
    CartComponent,
    SuccessfulOrderDialogComponent,
    MovingMenuComponent,
    AuthorizationComponent,
    CartPageComponent,
    ReviewListComponent,
    ClientAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LazyLoadImageModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SuccessfulOrderDialogComponent]
})
export class AppModule { }
