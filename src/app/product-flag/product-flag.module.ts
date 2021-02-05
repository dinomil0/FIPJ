import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductFlagPageRoutingModule } from './product-flag-routing.module';

import { ProductFlagPage } from './product-flag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductFlagPageRoutingModule
  ],
  declarations: [ProductFlagPage]
})
export class ProductFlagPageModule {}
