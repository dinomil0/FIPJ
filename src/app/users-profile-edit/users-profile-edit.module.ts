import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersProfileEditPageRoutingModule } from './users-profile-edit-routing.module';

import { UsersProfileEditPage } from './users-profile-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UsersProfileEditPageRoutingModule
  ],
  declarations: [UsersProfileEditPage]
})
export class UsersProfileEditPageModule {}
