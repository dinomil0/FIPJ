import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarbonFootprintPage } from './carbon-footprint.page';

const routes: Routes = [
  {
    path: '',
    component: CarbonFootprintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarbonFootprintPageRoutingModule {}
