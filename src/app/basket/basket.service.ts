import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { Book } from '../shared/models/book';
import { SingleBook } from '../shared/models/singleBook';
import { Delivery } from '../shared/models/delivery';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) { }

  setShippingPrice(delivery: Delivery){
    this.shipping = delivery.price;
    this.calculateTotals();
  }

  getBasket(id: string){
    return this.http.get<Basket>(this.baseUrl + 'Basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'Basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket)
        this.calculateTotals();
      }
    })
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Book | SingleBook | BasketItem, quantity = 1){
    if(this.isBook(item)) {item = this.mapBookItemToBasketItem(item); }
    else if(this.isSingleBook(item)){
      item = this.mapSingleBookItemToBasketItem(item);
    }
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(id: number, quantity = 1){
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const item = basket.items.find(x => x.id === id);
    if(item) {
      item.quantity -= quantity;
      if(item.quantity === 0){
        basket.items = basket.items.filter(x => x.id !== id);
      }

      if(basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket);
    }
  }
  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.deleteLocalBasket();
      }
    })
  }

  deleteLocalBasket(){
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  createBasket():Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }


  private mapBookItemToBasketItem(item: Book): BasketItem{
    return {
      id: item.id,
      productName: item.title,
      price: item.price,
      quantity: 0,
      imageURL: item.imageURL,
      authors: item.authors
    }
  }

  private mapSingleBookItemToBasketItem(item: SingleBook): BasketItem{
    return {
      id: item.id,
      productName: item.title,
      price: item.price,
      quantity: 0,
      imageURL: item.imageURL,
      authors: item.author.map(author => author.fullName)
    }
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + this.shipping;
    this.basketTotalSource.next({shipping: this.shipping, total, subtotal});
  }

  private isBook(item: Book | SingleBook | BasketItem): item is Book {
    return ('authors' in item) && !('author' in item);
  }

  private isSingleBook(item: Book | SingleBook | BasketItem): item is SingleBook {
    return ('author' in item) && !('authors' in item);
  }

}
