import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationplatformPageRoutingModule } from './educationplatform-routing.module';

import { EducationplatformPage } from './educationplatform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationplatformPageRoutingModule
  ],
  declarations: [EducationplatformPage]
})
export class EducationplatformPageModule {}
