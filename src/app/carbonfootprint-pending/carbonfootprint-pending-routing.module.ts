import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarbonfootprintPendingPage } from './carbonfootprint-pending.page';

const routes: Routes = [
  {
    path: '',
    component: CarbonfootprintPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarbonfootprintPendingPageRoutingModule {}
