import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

import { Product } from '../../models/product.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
	public allProducts: Product[] = [];

	constructor(public apiService: ApiService, public cartService: CartService) {
    this.apiService.getAllProducts().subscribe( (allProducts: Product[]) => {
      this.allProducts = allProducts;
  	});
  }

	ngOnInit() {

  }


}
