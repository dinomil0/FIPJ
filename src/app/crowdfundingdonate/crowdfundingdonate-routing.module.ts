import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrowdfundingdonatePage } from './crowdfundingdonate.page';

const routes: Routes = [
  {
    path: '',
    component: CrowdfundingdonatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrowdfundingdonatePageRoutingModule {}
