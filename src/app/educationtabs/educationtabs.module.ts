import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationtabsPageRoutingModule } from './educationtabs-routing.module';

import { EducationtabsPage } from './educationtabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationtabsPageRoutingModule
  ],
  declarations: [EducationtabsPage]
})
export class EducationtabsPageModule {}
