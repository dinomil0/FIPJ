import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrowdfundingPendingPage } from './crowdfunding-pending.page';

const routes: Routes = [
  {
    path: '',
    component: CrowdfundingPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrowdfundingPendingPageRoutingModule {}
