import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCrowdfundingListingPageRoutingModule } from './create-crowdfunding-listing-routing.module';

import { CreateCrowdfundingListingPage } from './create-crowdfunding-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateCrowdfundingListingPageRoutingModule
  ],
  declarations: [CreateCrowdfundingListingPage]
})
export class CreateCrowdfundingListingPageModule {}
