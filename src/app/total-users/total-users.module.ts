import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotalUsersPageRoutingModule } from './total-users-routing.module';

import { TotalUsersPage } from './total-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotalUsersPageRoutingModule
  ],
  declarations: [TotalUsersPage]
})
export class TotalUsersPageModule {}
