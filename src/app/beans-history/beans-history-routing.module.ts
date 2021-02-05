import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeansHistoryPage } from './beans-history.page';

const routes: Routes = [
  {
    path: '',
    component: BeansHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeansHistoryPageRoutingModule {}
