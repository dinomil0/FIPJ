import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarbonfootprintPendingPageRoutingModule } from './carbonfootprint-pending-routing.module';

import { CarbonfootprintPendingPage } from './carbonfootprint-pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarbonfootprintPendingPageRoutingModule
  ],
  declarations: [CarbonfootprintPendingPage]
})
export class CarbonfootprintPendingPageModule {}
