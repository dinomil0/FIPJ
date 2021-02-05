import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarbonFootprintSummaryPageRoutingModule } from './carbon-footprint-summary-routing.module';

import { CarbonFootprintSummaryPage } from './carbon-footprint-summary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarbonFootprintSummaryPageRoutingModule
  ],
  declarations: [CarbonFootprintSummaryPage]
})
export class CarbonFootprintSummaryPageModule {}
