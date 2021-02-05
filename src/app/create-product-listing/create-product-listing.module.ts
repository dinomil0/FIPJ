import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateProductListingPageRoutingModule } from './create-product-listing-routing.module';

import { CreateProductListingPage } from './create-product-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateProductListingPageRoutingModule
  ],
  declarations: [CreateProductListingPage]
})
export class CreateProductListingPageModule {}
