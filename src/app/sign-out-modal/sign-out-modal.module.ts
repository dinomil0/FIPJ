import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignOutModalPageRoutingModule } from './sign-out-modal-routing.module';

import { SignOutModalPage } from './sign-out-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignOutModalPageRoutingModule
  ],
  declarations: [SignOutModalPage]
})
export class SignOutModalPageModule {}
