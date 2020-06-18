import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
//Компонент страницы товара
export class ProductPageComponent implements OnInit {

  public product: Product = new Product();  //товар

  constructor(public apiService: ApiService, public cartService: CartService, private route: ActivatedRoute) {
  }

	ngOnInit() {
    //Получение и установка информации о товаре
    this.apiService.getProductById(this.route.snapshot.params['id']).subscribe((product: Product)=>{
      this.product = product;
    });
  }

}
