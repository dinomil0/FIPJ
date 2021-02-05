import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationplatformDetailPageRoutingModule } from './educationplatform-detail-routing.module';

import { EducationplatformDetailPage } from './educationplatform-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationplatformDetailPageRoutingModule
  ],
  declarations: [EducationplatformDetailPage]
})
export class EducationplatformDetailPageModule {}
