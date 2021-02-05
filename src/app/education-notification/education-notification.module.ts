import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationNotificationPageRoutingModule } from './education-notification-routing.module';

import { EducationNotificationPage } from './education-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EducationNotificationPageRoutingModule
  ],
  declarations: [EducationNotificationPage]
})
export class EducationNotificationPageModule {}
