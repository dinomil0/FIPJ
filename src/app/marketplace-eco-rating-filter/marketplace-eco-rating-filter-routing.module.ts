import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketplaceEcoRatingFilterPage } from './marketplace-eco-rating-filter.page';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceEcoRatingFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplaceEcoRatingFilterPageRoutingModule {}
