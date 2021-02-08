import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarbonfootprintDetailPage } from './carbonfootprint-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CarbonfootprintDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarbonfootprintDetailPageRoutingModule {}
