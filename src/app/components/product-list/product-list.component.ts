import { Component, OnInit } from '@angular/core';
//Импорт сервисов
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
//Импорт класса-модели товара
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
//Компонент списка товаров
export class ProductListComponent implements OnInit {
	public allProducts: Product[] = [];  //Список всех товаров

	constructor(public apiService: ApiService, public cartService: CartService) {
    //Получение и установка списка всех товаров
    this.apiService.getAllProducts().subscribe( (allProducts: Product[]) => {
      this.allProducts = allProducts;
  	});
  }

	ngOnInit() {
  }


}
