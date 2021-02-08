import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrowdfundingProfilePageRoutingModule } from './crowdfunding-profile-routing.module';

import { CrowdfundingProfilePage } from './crowdfunding-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrowdfundingProfilePageRoutingModule
  ],
  declarations: [CrowdfundingProfilePage]
})
export class CrowdfundingProfilePageModule {}
