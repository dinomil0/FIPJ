import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPendingPage } from './product-pending.page';

const routes: Routes = [
  {
    path: '',
    component: ProductPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPendingPageRoutingModule {}
