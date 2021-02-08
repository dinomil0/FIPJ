import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MpCheckoutPageRoutingModule } from './mp-checkout-routing.module';

import { MpCheckoutPage } from './mp-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MpCheckoutPageRoutingModule
  ],
  declarations: [MpCheckoutPage]
})
export class MpCheckoutPageModule {}
