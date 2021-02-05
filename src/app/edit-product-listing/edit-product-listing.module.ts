import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProductListingPageRoutingModule } from './edit-product-listing-routing.module';

import { EditProductListingPage } from './edit-product-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditProductListingPageRoutingModule
  ],
  declarations: [EditProductListingPage]
})
export class EditProductListingPageModule {}
