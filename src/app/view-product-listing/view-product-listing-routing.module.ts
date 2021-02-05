import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProductListingPage } from './view-product-listing.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProductListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProductListingPageRoutingModule {}
