import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationProfilePageRoutingModule } from './education-profile-routing.module';

import { EducationProfilePage } from './education-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationProfilePageRoutingModule
  ],
  declarations: [EducationProfilePage]
})
export class EducationProfilePageModule {}
