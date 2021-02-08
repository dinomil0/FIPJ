import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrowdfundingProfilePage } from './crowdfunding-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CrowdfundingProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrowdfundingProfilePageRoutingModule {}
