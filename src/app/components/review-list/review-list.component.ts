import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { Product } from 'src/app/models/product.model';
import { Review } from  './../../models/review.model';
import { Client } from  './../../models/client.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit, OnDestroy {

  public allReviews: Review[] = [];
  public arr = Array;
  public product_id: number = null;
  public productsBoughtByClient: number[] = [];

  private subscriptionClient: Subscription;
  public currentClient: Client = new Client;

  public newReviewFormMessage: string = '';
  public alreadyReviewed: boolean = false;

  constructor(public apiService: ApiService, private authService: AuthService, private route: ActivatedRoute) {
    this.subscriptionClient = this.authService.currentClient.subscribe(currentClient => {
      this.currentClient = currentClient;

      if(this.currentClient.id){
        this.apiService.getProductsBoughtByClient().subscribe( (productsIds: number[]) => {
          this.productsBoughtByClient = productsIds;
        });
      }
      this.alreadyReviewed = this.allReviews.some( (review) => review.client.id === this.currentClient.id );

    });
  }

  ngOnInit(): void {


    this.product_id = this.route.snapshot.params['id'];

    this.apiService.getReviewsOfProduct(this.product_id).subscribe( (reviews: Review[]) => {
      this.allReviews = reviews;
      this.allReviews.sort(function(a, b) {
        let dateA = new Date(a.modified);
        let dateB = new Date(b.modified);
        return +dateB - +dateA;
      });
      this.alreadyReviewed = this.allReviews.some( (review) => review.client.id === this.currentClient.id);
    });

  }

  ngOnDestroy(){
    this.subscriptionClient.unsubscribe();
  }


  setStars(starsCount: number){
      let stars: any = document.getElementsByClassName("star");
      let i: number;
      for (i = 0; i < starsCount; i++) {
        stars[(stars.length-1) - i].classList.add("chosen");
      }
      for (i = starsCount; i < stars.length; i++) {
        stars[(stars.length-1) - i].classList.remove("chosen");
      }
    }

  onSubmit(){
      let rating: number = (document.getElementsByClassName("chosen")).length;
      if(!rating){
        this.newReviewFormMessage = "Пожалуйста, поставьте оценку";
        return;
      }

      let text: any = (<HTMLInputElement>document.getElementsByClassName("new_review_form_text")[0]).value;
      let review: Review = new Review(this.product_id, text, rating);

      let submitButton: any = document.getElementsByClassName("submit_button")[0];
      if(submitButton.classList.contains("create_button")){
        this.apiService.postReview(review).subscribe( (newReviewId: number) => {
          this.apiService.getReviewsOfProduct(this.product_id).subscribe( (reviews: Review[]) => {
            this.allReviews = reviews;
            this.allReviews.sort(function(a, b) {
              let dateA = new Date(a.modified);
              let dateB = new Date(b.modified);
              return +dateB - +dateA;
            });
            this.alreadyReviewed = true;
          });
        });
      } else{
        this.apiService.putReview(review).subscribe( (newReviewId: number) => {
          this.apiService.getReviewsOfProduct(this.product_id).subscribe( (reviews: Review[]) => {
            this.allReviews = reviews;
            this.allReviews.sort(function(a, b) {
              let dateA = new Date(a.modified);
              let dateB = new Date(b.modified);
              return +dateB - +dateA;
            });
            this.alreadyReviewed = true;
          });
        });
      }

    }

  editReview(review: Review){
    this.alreadyReviewed = false;
    setTimeout(() => {
      let formText: any = document.getElementsByClassName("new_review_form_text")[0];
      formText.value = review.text;
      this.setStars(review.rating);
      let submitButton: any = document.getElementsByClassName("submit_button")[0];
      submitButton.classList.remove("create_button");
      submitButton.classList.add("edit_button");

      formText.scrollIntoView({ behavior: 'smooth', block: 'center'});
    }, 0);

  }

  deleteReview(productId: number){
    this.apiService.deleteReview(productId).subscribe( (response: string) => {
      this.apiService.getReviewsOfProduct(this.product_id).subscribe( (reviews: Review[]) => {
        this.allReviews = reviews;
        this.allReviews.sort(function(a, b) {
          let dateA = new Date(a.modified);
          let dateB = new Date(b.modified);
          return +dateB - +dateA;
        });
      });
      this.alreadyReviewed = false;
      setTimeout(() => {
        let submitButton: any = document.getElementsByClassName("submit_button")[0];
        submitButton.classList.remove("edit_button");
        submitButton.classList.add("create_button");
      }, 0);
    });
  }

}
