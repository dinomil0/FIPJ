import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationBusinessPageRoutingModule } from './registration-business-routing.module';

import { RegistrationBusinessPage } from './registration-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrationBusinessPageRoutingModule
  ],
  declarations: [RegistrationBusinessPage]
})
export class RegistrationBusinessPageModule {}
