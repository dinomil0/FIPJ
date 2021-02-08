import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MpCheckoutPage } from './mp-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: MpCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MpCheckoutPageRoutingModule {}
