import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrowdfundingEditPageRoutingModule } from './crowdfunding-edit-routing.module';

import { CrowdfundingEditPage } from './crowdfunding-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CrowdfundingEditPageRoutingModule
  ],
  declarations: [CrowdfundingEditPage]
})
export class CrowdfundingEditPageModule {}
