import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddToCartPopoverPage } from './add-to-cart-popover.page';

const routes: Routes = [
  {
    path: '',
    component: AddToCartPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddToCartPopoverPageRoutingModule {}
