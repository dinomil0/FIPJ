import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationTagsPageRoutingModule } from './education-tags-routing.module';

import { EducationTagsPage } from './education-tags.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationTagsPageRoutingModule
  ],
  declarations: [EducationTagsPage]
})
export class EducationTagsPageModule {}
