import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketplaceEcoRatingFilterPageRoutingModule } from './marketplace-eco-rating-filter-routing.module';

import { MarketplaceEcoRatingFilterPage } from './marketplace-eco-rating-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MarketplaceEcoRatingFilterPageRoutingModule
  ],
  declarations: [MarketplaceEcoRatingFilterPage]
})
export class MarketplaceEcoRatingFilterPageModule {}
