import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabMarketHistoryPage } from './tab-market-history.page';

const routes: Routes = [
  {
    path: '',
    component: TabMarketHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabMarketHistoryPageRoutingModule {}
