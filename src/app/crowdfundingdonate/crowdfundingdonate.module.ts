import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrowdfundingdonatePageRoutingModule } from './crowdfundingdonate-routing.module';

import { CrowdfundingdonatePage } from './crowdfundingdonate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CrowdfundingdonatePageRoutingModule
  ],
  declarations: [CrowdfundingdonatePage]
})
export class CrowdfundingdonatePageModule {}
