import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationplatformHomePageRoutingModule } from './educationplatform-home-routing.module';

import { EducationplatformHomePage } from './educationplatform-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationplatformHomePageRoutingModule
  ],
  declarations: [EducationplatformHomePage]
})
export class EducationplatformHomePageModule {}
