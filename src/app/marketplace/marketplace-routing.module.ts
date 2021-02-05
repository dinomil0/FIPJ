import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabCrowdFundingPage } from '../tab-crowd-funding/tab-crowd-funding.page';

import { MarketplacePage } from './marketplace.page';

const routes: Routes = [
  {
    path: '',
    component: MarketplacePage,
    children:
      [
        {
          path: 'crowdfunding',
          // children: [{
          //   path: '',
          //   // component: TabCrowdFundingPage,
            loadChildren: () => import('../tab-crowd-funding/tab-crowd-funding.module').then(m => m.TabCrowdFundingPageModule)
          // }]
        },
        // {
          // path: 'home',
          // children: [{
          //   path: '',
            // component: MarketplacePage,
            // loadChildren: () => import('../marketplace/marketplace.module').then(m => m.MarketplacePageModule)
          // }]
        // },
        {
          path: 'marketplace/',
          redirectTo: '/marketplace',
          pathMatch: 'full'
        },
      ]
  },
  {
    path: 'marketplace/',
    redirectTo: '/marketplace',
    pathMatch: 'full'
  },
 
// ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplacePageRoutingModule { }
