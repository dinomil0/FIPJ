import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabCrowdFundingPage } from './tab-crowd-funding.page';

const routes: Routes = [
  {
    path: '',
    component: TabCrowdFundingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabCrowdFundingPageRoutingModule {}
