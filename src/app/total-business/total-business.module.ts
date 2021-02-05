import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotalBusinessPageRoutingModule } from './total-business-routing.module';

import { TotalBusinessPage } from './total-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotalBusinessPageRoutingModule
  ],
  declarations: [TotalBusinessPage]
})
export class TotalBusinessPageModule {}
