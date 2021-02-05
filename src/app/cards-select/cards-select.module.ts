import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardsSelectPageRoutingModule } from './cards-select-routing.module';

import { CardsSelectPage } from './cards-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CardsSelectPageRoutingModule
  ],
  declarations: [CardsSelectPage]
})
export class CardsSelectPageModule {}
