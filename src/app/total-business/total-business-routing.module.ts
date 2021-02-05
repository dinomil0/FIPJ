import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotalBusinessPage } from './total-business.page';

const routes: Routes = [
  {
    path: '',
    component: TotalBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotalBusinessPageRoutingModule {}
