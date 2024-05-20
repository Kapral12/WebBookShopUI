import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ShopComponent } from './shop.component';


const routes: Routes = [
  {path: '', component: ShopComponent, data: {breadcrumb: 'Каталог'}},
  {path: ':id', component: BookDetailsComponent, data:{breadcrumb: {alias: 'bookDetails'}}  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
