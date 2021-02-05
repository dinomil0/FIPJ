import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPendingPageRoutingModule } from './product-pending-routing.module';

import { ProductPendingPage } from './product-pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPendingPageRoutingModule
  ],
  declarations: [ProductPendingPage]
})
export class ProductPendingPageModule {}
