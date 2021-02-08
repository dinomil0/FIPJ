import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateAverageCarbonfootprintPage } from './update-average-carbonfootprint.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateAverageCarbonfootprintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateAverageCarbonfootprintPageRoutingModule {}
