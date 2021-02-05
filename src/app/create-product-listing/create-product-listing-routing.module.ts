import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProductListingPage } from './create-product-listing.page';

const routes: Routes = [
  {
    path: '',
    component: CreateProductListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateProductListingPageRoutingModule {}
