import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeansRewardsPage } from './beans-rewards.page';

const routes: Routes = [
  {
    path: '',
    component: BeansRewardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeansRewardsPageRoutingModule {}
