import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarbonFootprintPageRoutingModule } from './carbon-footprint-routing.module';

import { CarbonFootprintPage } from './carbon-footprint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CarbonFootprintPageRoutingModule
  ],
  declarations: [CarbonFootprintPage]
})
export class CarbonFootprintPageModule {}
