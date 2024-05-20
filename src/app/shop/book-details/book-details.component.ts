import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { SingleBook } from 'src/app/shared/models/singleBook';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit{

singleBook?: SingleBook;
quantity = 1;
quantityInBasket = 0;

constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
  private bcService: BreadcrumbService, private basketService: BasketService){}

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.shopService.getSingeBook(+id).subscribe({
      next: singleBook => {
        this.singleBook = singleBook;
        this.bcService.set('@bookDetails', singleBook.title);
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next: basket => {
            const item = basket?.items.find(x => x.id === +id);
            if(item) {
              this.quantity = item.quantity;
              this.quantityInBasket = item.quantity;
            }
          }
        })
      },
      error: error => console.log(error)
    })
  }

  incrementQuantity(){
    if (this.singleBook && this.quantity < this.singleBook.amount) {
      this.quantity++;
    }
  }

  decrementQuantity(){
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  updateBasket(){
    console.log(this.singleBook?.author.map(author => author.fullName))

    if(this.singleBook){
      if(this.quantity > this.quantityInBasket){
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.singleBook, itemsToAdd);
      } else {
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.singleBook.id, itemsToRemove);
      }
    }
  }

  get buttonText(){
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }

  itemsPerSlide = 5;
  singleSlideOffset = true;

  slides = [
    {image: 'https://localhost:7274//img/books/dvir_kril_i_ruin.jpg'},
    {image: 'https://localhost:7274//img/books/eye_of_time.jpg'},
    {image: 'https://localhost:7274//img/books/game_of_thrones.jpg'},
    {image: 'https://localhost:7274//img/books/fure_of_swords.jpg'},
    {image: 'https://localhost:7274//img/books/game_of_thrones.jpg'},
  ];

}
