import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabMarketHistoryPageRoutingModule } from './tab-market-history-routing.module';

import { TabMarketHistoryPage } from './tab-market-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabMarketHistoryPageRoutingModule
  ],
  declarations: [TabMarketHistoryPage]
})
export class TabMarketHistoryPageModule {}
