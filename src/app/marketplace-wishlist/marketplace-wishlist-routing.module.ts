import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketplaceWishlistPage } from './marketplace-wishlist.page';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceWishlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplaceWishlistPageRoutingModule {}
