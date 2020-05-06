import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
//import { PhotoSliderComponent} from './../../components/photo-slider/photo-slider.component';

import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  public product: Product = new Product();
  public id_product: number = null;

  constructor(public apiService: ApiService, public cartService: CartService, private route: ActivatedRoute) {
    //this.id_product = parseInt(this.router.url.substring(this.router.url.lastIndexOf('/') + 1));
    this.id_product = route.snapshot.params['id'];
    this.apiService.getProductById(this.id_product).subscribe((product: Product)=>{
      console.log(this.apiService.PHP_API_SERVER+"/backend/product-photos/"+product.photo);
      this.product = product;
    });
  }

	ngOnInit() {
    /*  this.route.paramMap.pipe(
          switchMap(params => params.getAll('id'))
      )
      .subscribe(data => {
        this.id_product = +data;
        this.apiService.getProductById(this.id_product).subscribe((product: Product)=>{
          console.log(this.apiService.PHP_API_SERVER+"/backend/product-photos/"+product.photo);
          this.product = product;
        });
      });
*/
    }
}
