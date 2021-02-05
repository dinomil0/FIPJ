import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketplaceWishlistPageRoutingModule } from './marketplace-wishlist-routing.module';

import { MarketplaceWishlistPage } from './marketplace-wishlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketplaceWishlistPageRoutingModule
  ],
  declarations: [MarketplaceWishlistPage]
})
export class MarketplaceWishlistPageModule {}
