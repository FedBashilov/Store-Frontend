import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PhotoSliderComponent} from './../../components/photo-slider/photo-slider.component';

import { ApiService } from '../../services/api.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  
  public product: Product = new Product();
  public id_product: number = null;

  constructor(private apiService: ApiService, private router: Router) { }

	ngOnInit() {

    this.id_product = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
    
		this.apiService.getProductById(this.id_product).subscribe((product: Product)=>{
	  		this.product = product;
  		})
	}

}
