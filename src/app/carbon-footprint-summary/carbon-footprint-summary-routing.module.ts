import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarbonFootprintSummaryPage } from './carbon-footprint-summary.page';

const routes: Routes = [
  {
    path: '',
    component: CarbonFootprintSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarbonFootprintSummaryPageRoutingModule {}
