import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../shared/models/book';
import { BookSeries } from '../shared/models/bookseries';
import { Genre } from '../shared/models/genre';
import { Pagination } from '../shared/models/pagination';
import { Publisher } from '../shared/models/publisher';
import { ShopParams } from '../shared/models/shopParams';
import { SingleBook } from '../shared/models/singleBook';
import { Author } from '../shared/models/author';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7274/api/';
  filteredGenres: any;


  constructor(private http: HttpClient) { }

  getBooks(ShopParams: ShopParams){
    let params = new HttpParams();

    if(ShopParams.sort) params = params.append('PageIndex', ShopParams.pageNumber);
    if(ShopParams.sort) params = params.append('pageSize', ShopParams.pageSize);
    // if(ShopParams.publisherId > 0) params = params.append('PublisherId', ShopParams.publisherId);
    // if(ShopParams.bookseriesIds > 0) params = params.append('BookseriesId', ShopParams.bookseriesIds);


    if(ShopParams.MaxUploadDate) params = params.append('MaxUploadDate', ShopParams.MaxUploadDate);
    if(ShopParams.MinUploadDate) params = params.append('MinUploadDate', ShopParams.MinUploadDate);

    if(ShopParams.genreIds && ShopParams.genreIds.length > 0){
      for(let i = 0; i < ShopParams.genreIds.length; i++){
        params = params.append('GenreIds', ShopParams.genreIds[i].toString());
      }
    }

    if(ShopParams.bookseriesIds && ShopParams.bookseriesIds.length > 0){
      for(let i = 0; i < ShopParams.bookseriesIds.length; i++){
        params = params.append('BookseriesIds', ShopParams.bookseriesIds[i].toString());
      }
    }

    if(ShopParams.authorIds && ShopParams.authorIds.length > 0){
      for(let i = 0; i < ShopParams.authorIds.length; i++){
        params = params.append('AuthorIds', ShopParams.authorIds[i].toString());
      }
    }

    if(ShopParams.publisherIds && ShopParams.publisherIds.length > 0){
      for(let i = 0; i < ShopParams.publisherIds.length; i++){
        params = params.append('PublishersIds', ShopParams.publisherIds[i].toString());
      }
    }

    // Except
    if(ShopParams.bookseriesIdsExcept && ShopParams.bookseriesIdsExcept.length > 0){
      for(let i = 0; i < ShopParams.bookseriesIdsExcept.length; i++){
        params = params.append('ExceptBookSeriesId', ShopParams.bookseriesIdsExcept[i].toString());
      }
    }

    if(ShopParams.publisherIdsExcept && ShopParams.publisherIdsExcept.length > 0){
      for(let i = 0; i < ShopParams.publisherIdsExcept.length; i++){
        params = params.append('ExceptPublishersId', ShopParams.publisherIdsExcept[i].toString());
      }
    }

    if(ShopParams.genreIdsExcept && ShopParams.genreIdsExcept.length > 0){
      for(let i = 0; i < ShopParams.genreIdsExcept.length; i++){
        params = params.append('ExceptGenresIds', ShopParams.genreIdsExcept[i].toString());
      }
    }

    if(ShopParams.authorIdsExcept && ShopParams.authorIdsExcept.length > 0){
      for(let i = 0; i < ShopParams.authorIdsExcept.length; i++){
        params = params.append('ExceptAuthorIds', ShopParams.authorIdsExcept[i].toString());
      }
    }

    if(ShopParams.sort) params = params.append('Sort', ShopParams.sort);
    if(ShopParams.search) params = params.append('Search', ShopParams.search);

    return this.http.get<Pagination<Book[]>>(this.baseUrl + 'Book/catalog_books', {params});
  }

  getSingeBook(id: number){
    return this.http.get<SingleBook>(this.baseUrl + 'Book/' + id);
  }

  getPublishers(){
    return this.http.get<Publisher[]>(this.baseUrl + 'Publisher/get-all-publishers');
  }

  getBookSeries(){
    return this.http.get<BookSeries[]>(this.baseUrl + 'BookSeries/get-all-book-series')
  }

  getGenre(){
    return this.http.get<Genre[]>(this.baseUrl + 'Genre/all-genres')
  }

  getAuthor(){
    return this.http.get<Author[]>(this.baseUrl + 'Book/authors')
  }

  getRecommedationsByOrders(){
    return this.http.get<Book[]>(this.baseUrl + 'Book/get-recommedations-by-orders');
  }

  getRecommedationsByAge(){
    return this.http.get<Book[]>(this.baseUrl + 'Book/get-recommedations-by-age');
  }

  getRecommedantionsBestSells(){
    return this.http.get<Book[]>(this.baseUrl + 'Book/get-best-sells-recommendation');
  }

  getRecommedantionsRandom(){
    return this.http.get<Book[]>(this.baseUrl + 'Book/get-random-recommedations');
  }
}
