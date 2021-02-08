import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAverageCarbonfootprintPageRoutingModule } from './update-average-carbonfootprint-routing.module';

import { UpdateAverageCarbonfootprintPage } from './update-average-carbonfootprint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateAverageCarbonfootprintPageRoutingModule
  ],
  declarations: [UpdateAverageCarbonfootprintPage]
})
export class UpdateAverageCarbonfootprintPageModule {}
