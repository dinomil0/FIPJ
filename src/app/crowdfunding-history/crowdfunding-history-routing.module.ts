import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrowdfundingHistoryPage } from './crowdfunding-history.page';

const routes: Routes = [
  {
    path: '',
    component: CrowdfundingHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrowdfundingHistoryPageRoutingModule {}
