import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrowdfundingtabsPageRoutingModule } from './crowdfundingtabs-routing.module';

import { CrowdfundingtabsPage } from './crowdfundingtabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrowdfundingtabsPageRoutingModule
  ],
  declarations: [CrowdfundingtabsPage]
})
export class CrowdfundingtabsPageModule {}
