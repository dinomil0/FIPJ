import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketplaceTransactionHistoryPage } from './marketplace-transaction-history.page';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceTransactionHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplaceTransactionHistoryPageRoutingModule {}
