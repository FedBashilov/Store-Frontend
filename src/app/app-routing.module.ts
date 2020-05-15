import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent},
    {path: 'shop',
      children: [
        {path: '', component: ShopPageComponent},
    	  {path: 'product/:id', component: ProductPageComponent},
    	]
    },
    {path: 'cart', component: CartPageComponent},
    {path: 'about-us', component: AboutUsPageComponent},
    {path: 'contacts', component: ContactsPageComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomePageComponent, ShopPageComponent, ProductPageComponent, AboutUsPageComponent, ContactsPageComponent]
