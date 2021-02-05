import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialmediaplatformPageRoutingModule } from './socialmediaplatform-routing.module';

import { SocialmediaplatformPage } from './socialmediaplatform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialmediaplatformPageRoutingModule
  ],
  declarations: [SocialmediaplatformPage]
})
export class SocialmediaplatformPageModule {}
