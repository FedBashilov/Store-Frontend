import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.css']
})
export class PhotoSliderComponent implements OnInit {

  @Input() product: Product;
  public curPhotoIndex: number = 0;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
  }

  pressed(e){
  	console.log("pressed");
  }

  changeImage( moveTo: number){
    this.curPhotoIndex += moveTo;
    if( this.curPhotoIndex < 0 ){
      this.curPhotoIndex = this.product.photos.length - 1;
    }
    if( this.curPhotoIndex == this.product.photos.length){
      this.curPhotoIndex = 0;
    }
  }
}
