import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeansHistoryPageRoutingModule } from './beans-history-routing.module';

import { BeansHistoryPage } from './beans-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeansHistoryPageRoutingModule
  ],
  declarations: [BeansHistoryPage]
})
export class BeansHistoryPageModule {}
