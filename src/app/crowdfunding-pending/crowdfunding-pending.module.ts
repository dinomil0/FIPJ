import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrowdfundingPendingPageRoutingModule } from './crowdfunding-pending-routing.module';

import { CrowdfundingPendingPage } from './crowdfunding-pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrowdfundingPendingPageRoutingModule
  ],
  declarations: [CrowdfundingPendingPage]
})
export class CrowdfundingPendingPageModule {}
