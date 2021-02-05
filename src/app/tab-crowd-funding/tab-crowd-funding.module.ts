import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabCrowdFundingPageRoutingModule } from './tab-crowd-funding-routing.module';

import { TabCrowdFundingPage } from './tab-crowd-funding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabCrowdFundingPageRoutingModule
  ],
  declarations: [TabCrowdFundingPage]
})
export class TabCrowdFundingPageModule {}
