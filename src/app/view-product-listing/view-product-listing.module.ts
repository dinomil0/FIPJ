import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductListingPageRoutingModule } from './view-product-listing-routing.module';

import { ViewProductListingPage } from './view-product-listing.page';
import { ActivatedRoute } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProductListingPageRoutingModule
  ],
  declarations: [ViewProductListingPage]
})
export class ViewProductListingPageModule {}
