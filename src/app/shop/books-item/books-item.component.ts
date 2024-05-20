import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Book } from 'src/app/shared/models/book';

@Component({
  selector: 'app-books-item',
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.scss']
})
export class BooksItemComponent {
  @Input() book?: Book;

  constructor(private basketService: BasketService) {}

  addItemToBasket(){
    this.book && this.basketService.addItemToBasket(this.book);
    console.log('Товар успешно добавлен в корзину');
  }

}
