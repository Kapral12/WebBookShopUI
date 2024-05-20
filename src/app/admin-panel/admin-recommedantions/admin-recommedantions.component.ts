import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AdminPanelService } from '../admin-panel.service';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ShopService } from 'src/app/shop/shop.service';
import { Book } from 'src/app/shared/models/book';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-recommedantions',
  templateUrl: './admin-recommedantions.component.html',
  styleUrls: ['./admin-recommedantions.component.scss']
})


export class AdminRecommedantionsComponent {

  users: User[] = [];
  userTotalCount = 0;
  selectedUser: User | null = null;
  recommedantions: Book[] = [];

  books: Book[] = [];
  bookTotalCount = 0;
  recomendTotal = 0;

  sendRecom: Book [] = [];

  userParam = new ShopParams();
  bookParam = new ShopParams();
  recomendParams = new ShopParams();


  constructor(private adminService: AdminPanelService, private shopService: ShopService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.getBooks();
  }


  sendRecommedantions(){
    this.toastr.success('Рекомендації відправлено!');
  }

  getBooks(){
    this.shopService.getBooks(this.bookParam).subscribe({
      next: response => {
        this.books = response.data;
        this.bookParam.pageNumber = response.pageIndex;
        this.bookParam.pageSize = response.pageSize;
        this.bookTotalCount = response.count;
      }, // what to do next
      error: error => console.log(error) // what to do if error
    })
  }

  onDateChange() {
    this.bookParam.pageNumber = 1; // Сбросить значение страницы на первую при изменении дат
    this.getBooks();
    if(this.selectedUser != null){
      this.recomendParams.MaxUploadDate = this.bookParam.MaxUploadDate;
      this.recomendParams.MinUploadDate = this.bookParam.MinUploadDate;
      this.recomendParams.pageNumber = 1;
      this.getRecommedations(this.selectedUser.id);
    }
  }

  getAllUsers(){
    this.adminService.getAllUsers(this.userParam).subscribe({
      next: response => {
        this.users = response.data;
        this.userParam.pageNumber = response.pageIndex;
        this.userParam.pageSize = response.pageSize;
        this.userTotalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.recomendParams.MaxUploadDate = this.bookParam.MaxUploadDate;
    this.recomendParams.MinUploadDate = this.bookParam.MinUploadDate;
    this.getRecommedations(user.id);
  }

  getRecommedations(userId: string){
    this.adminService.getRecommedationsByOrders(this.recomendParams, userId).subscribe({
      next: response => {
        this.recommedantions = response.data;
        this.recomendParams.pageNumber = response.pageIndex;
        this.recomendParams.pageSize = response.pageSize;
        this.recomendTotal = response.count;
      },
      error: error => console.log(error)
    })
  }

  addToSendRecom(book: Book) {
    if (!this.isBookInSendRecom(book)) {
      this.sendRecom.push(book);
    }
  }

  isBookInSendRecom(book: Book): boolean {
    return this.sendRecom.some((b) => b.title === book.title);
  }


  removeBookFromSendRecom(book: Book) {
    const index = this.sendRecom.indexOf(book);
    if (index > -1) {
      this.sendRecom.splice(index, 1);
    }
  }


  onPageChanged(event: any){
    if(this.userParam.pageNumber !== event){
      this.userParam.pageNumber = event;
      this.getAllUsers();
    }
  }

  onPageChangedBook(event: any){
    if(this.bookParam.pageNumber !== event){
      this.bookParam.pageNumber = event;
      this.getBooks();
    }
  }


  onPageChangedRecomend(event: any) {
    if (this.recomendParams.pageNumber !== event && this.selectedUser) {
      this.recomendParams.pageNumber = event; // Update pageNumber with the new event value
      this.getRecommedations(this.selectedUser.id);
    }
  }


}
