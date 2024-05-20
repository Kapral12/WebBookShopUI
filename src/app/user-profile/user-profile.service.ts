import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopParams } from '../shared/models/shopParams';
import { Order } from '../shared/models/order';
import { Pagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  baseUrl = 'https://localhost:7274/api/';

  constructor(private http: HttpClient) { }

  getOrdersForCurrentUser(UserParams: ShopParams){
    let params = new HttpParams();

    if (UserParams.pageNumber)
      params = params.append('pageIndex', UserParams.pageNumber.toString());

    if (UserParams.pageSize)
      // kostil for diplom  params = params.append('pageSize', UserParams.pageSize.toString());
      params = params.append('pageSize', UserParams.pageSize.toString());

    return this.http.get<Pagination<Order[]>>(this.baseUrl + 'Order/get-orders-for-current-user', {params});
  }

  changeOrderStatus(orderId: number, orderStatusId: number) {
    const url = this.baseUrl + 'Order/change-order-status';

    let params = new HttpParams();
    params = params.append('orderId', orderId.toString());
    params = params.append('orderStatusId', orderStatusId.toString());

    return this.http.put<Order>(url, null, { params });
  }

}
