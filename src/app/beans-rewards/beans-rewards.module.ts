import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeansRewardsPageRoutingModule } from './beans-rewards-routing.module';

import { BeansRewardsPage } from './beans-rewards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeansRewardsPageRoutingModule
  ],
  declarations: [BeansRewardsPage]
})
export class BeansRewardsPageModule {}
