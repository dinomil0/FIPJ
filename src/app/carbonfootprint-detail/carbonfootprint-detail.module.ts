import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarbonfootprintDetailPageRoutingModule } from './carbonfootprint-detail-routing.module';

import { CarbonfootprintDetailPage } from './carbonfootprint-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarbonfootprintDetailPageRoutingModule
  ],
  declarations: [CarbonfootprintDetailPage]
})
export class CarbonfootprintDetailPageModule {}
