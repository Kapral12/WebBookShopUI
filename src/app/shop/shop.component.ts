import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book } from '../shared/models/book';
import { BookSeries } from '../shared/models/bookseries';
import { Genre } from '../shared/models/genre';
import { Publisher } from '../shared/models/publisher';
import { ShopService } from './shop.service';
import { FormControl } from '@angular/forms';
import { ShopParams } from '../shared/models/shopParams';
import { Author } from '../shared/models/author';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})


export class ShopComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;

  books: Book[] = [];
  publishers: Publisher[] = [];
  bookseries: BookSeries[] = [];
  genres: Genre[] = [];
  authors: Author[] = [];
  recommedationsByOrders: Book[] = [];

  shopParams = new ShopParams();

  sortOptions = [
    {name: 'За алфавітом', value: 'name'},
    {name: 'Ціна: від низької до високої', value: 'priceAsc'},
    {name: 'Ціна: від високої до низької', value: 'priceDesc'},
  ];
  totalCount = 0;

  // Genre filter
  selectedIdGenres = new FormControl();
  searchCtrl = new FormControl();

  // Author filter
  selectedIdAuthors = new FormControl();
  authorSearchCtrl = new FormControl();

  // Publisher filter
  selectedIdPublishers = new FormControl();
  publisherSearchCtrl = new FormControl();

  // BookSeries filter
  selectedIdBookSeries = new FormControl();
  bookSeriesSearchCtrl = new FormControl();

  // BookSeries except filter
  selectedIdBookSeriesExcept = new FormControl();
  bookSeriesSearchCtrlExcept = new FormControl();

  // Publisher except filter
  selectedIdPublishersExcept = new FormControl();
  publisherSearchCtrlExcept = new FormControl();

  // Genre except filter
  selectedIdGenresExcept = new FormControl();
  searchCtrlExcept = new FormControl();

  // Author except filter
  selectedIdAuthorsExcept = new FormControl();
  authorSearchCtrlExcept = new FormControl();


  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.getBooksInCatalog();
    this.getPublishersForFilter();
    this.getBookSeriesForFilter();
    this.getGenreForFilter();
    this.getAuthorForFilter();
  }

  getBooksInCatalog(){
    this.shopService.getBooks(this.shopParams).subscribe({
      next: response => {
        this.books = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      }, // what to do next
      error: error => console.log(error) // what to do if error
    })
  }


  // get data for filter ALL

  getPublishersForFilter(){
    this.shopService.getPublishers().subscribe({
      next: response => this.publishers = response, // what to do next
      error: error => console.log(error) // what to do if error
    })
  }

  getBookSeriesForFilter(){
    this.shopService.getBookSeries().subscribe({
      next: response => this.bookseries = response, // what to do next
      error: error => console.log(error),
    })
  }

  getGenreForFilter(){
    this.shopService.getGenre().subscribe({
      next: response => this.genres = response, // what to do next
      error: error => console.log(error),
    })
  }

  getAuthorForFilter(){
    this.shopService.getAuthor().subscribe({
      next: response => this.authors = response, // what to do next
      error: error => console.log(error),
    })
  }

  // Assignment of data to be passed to books api

  onSortSelected(event: any){
    this.shopParams.sort = event.target.value;
    this.getBooksInCatalog();
    }

  // GenreFilter
  onGenresSelected(genresIds: number[]){
    this.shopParams.genreIds = this.selectedIdGenres.value;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }
  onGenreRemoved(genre: string) {
    const genresInFilter = this.selectedIdGenres.value as string[];
    this.removeFirst(genresInFilter, genre);
    this.selectedIdGenres.setValue(genresInFilter); // To trigger change detection
    this.getBooksInCatalog();
  }


  // AuthorFilter
  onAuthorsSelected(authorsIds: number[]){
    this.shopParams.authorIds = this.selectedIdAuthors.value;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  onAuthorRemoved(author: string) {
    const authorsInFilter = this.selectedIdAuthors.value as string[];
    this.removeFirst(authorsInFilter, author);
    this.selectedIdAuthors.setValue(authorsInFilter); // To trigger change detection
    this.getBooksInCatalog();
  }

  // PublisherFilter
  onPublisherSelected(publishersId: number[]){
    this.shopParams.publisherIds = this.selectedIdPublishers.value;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  onPublisherRemoved(publisher: string) {
    const publishersInFilter = this.selectedIdPublishers.value as string[];
    this.removeFirst(publishersInFilter, publisher);
    this.selectedIdPublishers.setValue(publishersInFilter); // To trigger change detection
    this.getBooksInCatalog();
  }

  // BookSeriesFilter
  onBookSeriesSelected(bookseriesIds: number[]){
    this.shopParams.bookseriesIds = this.selectedIdBookSeries.value;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  onBookSeriesRemoved(bookseries: string) {
    const bookseriesInFilter = this.selectedIdBookSeries.value as string[];
    this.removeFirst(bookseriesInFilter, bookseries);
    this.selectedIdBookSeries.setValue(bookseriesInFilter); // To trigger change detection
    this.getBooksInCatalog();
  }

  // BookSeriesFilter Except
  onBookSeriesSelectedExcept(bookseriesIdsExcept: number[]){
    this.shopParams.bookseriesIdsExcept = this.selectedIdBookSeriesExcept.value;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  onBookSeriesRemovedExcept(bookseries: string) {
    const bookseriesInFilter = this.selectedIdBookSeriesExcept.value as string[];
    this.removeFirst(bookseriesInFilter, bookseries);
    this.selectedIdBookSeriesExcept.setValue(bookseriesInFilter); // To trigger change detection
    this.getBooksInCatalog();
  }

  // PublisherFilter
  onPublisherSelectedExcept(publisherIdsExcept: number[]){
    this.shopParams.publisherIdsExcept = this.selectedIdPublishersExcept.value;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  onPublisherRemovedExcept(publisher: string) {
    const publishersInFilter = this.selectedIdPublishersExcept.value as string[];
    this.removeFirst(publishersInFilter, publisher);
    this.selectedIdPublishersExcept.setValue(publishersInFilter); // To trigger change detection
    this.getBooksInCatalog();
  }

  // GenreFilter Except
  onGenresSelectedExcept(genresIdsExcept: number[]){
    this.shopParams.genreIdsExcept = this.selectedIdGenresExcept.value;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  onGenreRemovedExcept(genre: string) {
    const genresInFilter = this.selectedIdGenresExcept.value as string[];
    this.removeFirst(genresInFilter, genre);
    this.selectedIdGenresExcept.setValue(genresInFilter); // To trigger change detection
    this.getBooksInCatalog();
 }

   // AuthorFilter Except
   onAuthorsSelectedExcept(authorsIdsExcept: number[]){
    this.shopParams.authorIdsExcept = this.selectedIdAuthorsExcept.value;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  onAuthorRemovedExcept(author: string) {
    const authorsInFilter = this.selectedIdAuthorsExcept.value as string[];
    this.removeFirst(authorsInFilter, author);
    this.selectedIdAuthorsExcept.setValue(authorsInFilter); // To trigger change detection
    this.getBooksInCatalog();
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  idsToGenres(ids: number[]) : any[] {
    if (ids === null) {
      return [];
    }
    return ids.map((id) => {
      return this.genres.find((t) => t.id == id);
    });
  }

  idsToGenresExcept(ids: number[]) : any[] {
    if (ids === null) {
      return [];
    }
    return ids.map((id) => {
      return this.genres.find((t) => t.id == id);
    });
  }

  idsToBookSeries(ids: number[]) : any[] {
    if (ids === null) {
      return [];
    }
    return ids.map((id) => {
      return this.bookseries.find((t) => t.id == id);
    });
  }

  idsToBookSeriesExcept(ids: number[]) : any[] {
    if (ids === null) {
      return [];
    }
    return ids.map((id) => {
      return this.bookseries.find((t) => t.id == id);
    });
  }

  idsToAuthors(ids: number[]) : any[] {
    if (ids === null) {
      return [];
    }
    return ids.map((id) => {
      return this.authors.find((t) => t.id == id);
    });
  }

  idsToAuthorsExcept(ids: number[]) : any[] {
    if (ids === null) {
      return [];
    }
    return ids.map((id) => {
      return this.authors.find((t) => t.id == id);
    });
  }

  idsToPublishers(ids: number[]) : any[] {
    if (ids === null) {
      return [];
    }
    return ids.map((id) => {
      return this.publishers.find((t) => t.id == id);
    });
  }

  idsToPublishersExcept(ids: number[]) : any[] {
    if (ids === null) {
      return [];
    }
    return ids.map((id) => {
      return this.publishers.find((t) => t.id == id);
    });
  }

  // Pagination
  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getBooksInCatalog();
    }
  }

  // Search
  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  // Reset all filters params
  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.selectedIdGenres.setValue([]);
    this.getBooksInCatalog();
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
