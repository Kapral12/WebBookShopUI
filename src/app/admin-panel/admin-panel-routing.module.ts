import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminRecommedantionsComponent } from './admin-recommedantions/admin-recommedantions.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';

const routes: Routes = [
  { path: '', component: AdminPanelComponent, data: { breadcrumb: 'Адмін-панель' } },
  { path: 'admin-orders', component: AdminOrdersComponent, data:  {breadcrumb: 'Замовлення' }},
  { path: 'admin-recommedantions', component: AdminRecommedantionsComponent, data:  {breadcrumb: 'Рекомендації' }},
  { path: 'admin-books', component: AdminBooksComponent, data:  {breadcrumb: 'Книги' }},


]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
