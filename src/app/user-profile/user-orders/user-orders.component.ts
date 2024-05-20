import { Component } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { UserProfileService } from '../user-profile.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent {

  orders: Order[] = [];
  orderTotalCount = 0;

  userParam = new ShopParams();

  constructor(private userProfieleService: UserProfileService) {
  }

  ngOnInit() {
    this.getOrderForCurrentUser();
  }

  getOrderForCurrentUser(){
    this.userProfieleService.getOrdersForCurrentUser(this.userParam).subscribe({
      next: response => {
        this.orders = response.data;
        this.userParam.pageNumber = response.pageIndex;
        this.userParam.pageSize = response.pageSize;
        this.orderTotalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  changeOrderStatus(orderId: number) {
    const orderStatusId = 8;

    this.userProfieleService.changeOrderStatus(orderId, orderStatusId).subscribe({
      next: response => {
        const index = this.orders.findIndex(order => order.id === response.id);
        if (index !== -1) {
          this.orders[index] = response;
        }
      },
      error: error => console.log(error)
    });

    this.getOrderForCurrentUser();
  }


  onPageChangedOrder(event: any){
    if(this.userParam.pageNumber !== event){
      this.userParam.pageNumber = event;
      this.getOrderForCurrentUser();
    }
  }

}
