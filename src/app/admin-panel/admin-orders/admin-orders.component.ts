import { Component } from '@angular/core';
import { AdminPanelService } from '../admin-panel.service';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {

  orders: Order[] = [];
  orderTotalCount = 0;

  userParam = new ShopParams();

  constructor(private adminService: AdminPanelService) {
  }

  ngOnInit() {
    this.getOrderForAdmin();
  }


  getOrderForAdmin(){
    this.adminService.getOrdersForAdmin(this.userParam).subscribe({
      next: response => {
        this.orders = response.data;
        this.userParam.pageNumber = response.pageIndex;
        this.userParam.pageSize = response.pageSize;
        this.orderTotalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  changeOrderStatus(orderId: number, orderStatusId: number) {
    this.adminService.changeOrderStatus(orderId, orderStatusId).subscribe({
      next: response => {
        const index = this.orders.findIndex(order => order.id === response.id);
        if (index !== -1) {
          this.orders[index] = response;
        }
      },
      error: error => console.log(error)
    });

    this.getOrderForAdmin();
  }

  onPageChangedOrder(event: any){
    if(this.userParam.pageNumber !== event){
      this.userParam.pageNumber = event;
      this.getOrderForAdmin();
    }
  }

}

