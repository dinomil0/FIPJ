import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrowdfundingEditPage } from './crowdfunding-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CrowdfundingEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrowdfundingEditPageRoutingModule {}
