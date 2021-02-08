import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrowdfundingHistoryPageRoutingModule } from './crowdfunding-history-routing.module';

import { CrowdfundingHistoryPage } from './crowdfunding-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrowdfundingHistoryPageRoutingModule
  ],
  declarations: [CrowdfundingHistoryPage]
})
export class CrowdfundingHistoryPageModule {}
