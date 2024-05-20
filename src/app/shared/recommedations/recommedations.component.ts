import { Component } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';
import { Book } from '../models/book';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-recommedations',
  templateUrl: './recommedations.component.html',
  styleUrls: ['./recommedations.component.scss']
})
export class RecommedationsComponent {

  recommedationsByOrders: Book[] = [];
  recommedationsByAge: Book[] = [];
  recomedantionsBestSells: Book[] = [];
  recommedantionsRandom: Book[] = [];

  constructor(public shopService: ShopService, public accountService: AccountService){

  }

  ngOnInit() {
    this.accountService.currentUser$.subscribe(user => {

      this.getRecommedantionsBestSells();
      this.getRecommendationsRandom();

      if (user != null) {
        this.getRecommedationsByOrder();
        this.getRecommedationsByAge();
      }
    });
  }

  getRecommedationsByOrder() {
    this.shopService.getRecommedationsByOrders().subscribe({
      next: response => {
        this.recommedationsByOrders = response;
      },
      error: error => console.log(error)
    });
  }

  getRecommedationsByAge(){
    this.shopService.getRecommedationsByAge().subscribe({
      next: response => {
        this.recommedationsByAge = response;
      },
      error: error => console.log(error)
    })
  }

  getRecommedantionsBestSells(){
    this.shopService.getRecommedantionsBestSells().subscribe({
      next: response => {
        this.recomedantionsBestSells = response;
      },
      error: error => console.log(error)
    })
  }

  getRecommendationsRandom(){
    this.shopService.getRecommedantionsRandom().subscribe({
      next: response => {
        this.recommedantionsRandom = response;
      },
      error: error => console.log(error)
    })
  }

  itemsPerSlide = 5;
  singleSlideOffset = true;
  noWrap = true;

}
