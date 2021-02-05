import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketplaceTabsPageRoutingModule } from './marketplace-tabs-routing.module';

import { MarketplaceTabsPage } from './marketplace-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketplaceTabsPageRoutingModule
  ],
  declarations: [MarketplaceTabsPage]
})
export class MarketplaceTabsPageModule {}
