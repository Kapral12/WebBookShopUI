import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../shared/models/user';
import { ShopParams } from '../shared/models/shopParams';
import { Pagination } from '../shared/models/pagination';
import { Book } from '../shared/models/book';
import { Order } from '../shared/models/order';


@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  baseUrl = 'https://localhost:7274/api/';

  constructor(private http: HttpClient) { }

  getAllUsers(UserParams: ShopParams) {
    let params = new HttpParams();

    if (UserParams.pageNumber)
      params = params.append('pageIndex', UserParams.pageNumber.toString());

    if (UserParams.pageSize)
      params = params.append('pageSize', UserParams.pageSize.toString());

    return this.http.get<Pagination<User[]>>(this.baseUrl + 'Account/get-all-users', { params });
  }

  getRecommedationsByOrders(UserParams: ShopParams, userId: string){
    let params = new HttpParams();

    if (UserParams.pageNumber)
      params = params.append('pageIndex', UserParams.pageNumber.toString());

    if (UserParams.pageSize)
      // kostil for diplom  params = params.append('pageSize', UserParams.pageSize.toString());
      params = params.append('pageSize', '3');

    if(userId)
      params = params.append('userId', userId);

    if(UserParams.MaxUploadDate) params = params.append('MaxUploadDate', UserParams.MaxUploadDate);
    if(UserParams.MinUploadDate) params = params.append('MinUploadDate', UserParams.MinUploadDate);

    return this.http.get<Pagination<Book[]>>(this.baseUrl + 'Book/get-recommedations-by-orders-with-pag', {params});
  }


  getOrdersForAdmin(UserParams: ShopParams){
    let params = new HttpParams();

    if (UserParams.pageNumber)
      params = params.append('pageIndex', UserParams.pageNumber.toString());

    if (UserParams.pageSize)
      // kostil for diplom  params = params.append('pageSize', UserParams.pageSize.toString());
      params = params.append('pageSize', UserParams.pageSize.toString());

    return this.http.get<Pagination<Order[]>>(this.baseUrl + 'Order/get-orders-for-admin', {params});
  }

  changeOrderStatus(orderId: number, orderStatusId: number) {
    const url = this.baseUrl + 'Order/change-order-status';

    let params = new HttpParams();
    params = params.append('orderId', orderId.toString());
    params = params.append('orderStatusId', orderStatusId.toString());

    return this.http.put<Order>(url, null, { params });
  }
}
