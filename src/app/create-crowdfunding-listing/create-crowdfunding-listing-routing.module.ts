import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCrowdfundingListingPage } from './create-crowdfunding-listing.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCrowdfundingListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCrowdfundingListingPageRoutingModule {}
