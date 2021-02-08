import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrowdfundingtabsPage } from './crowdfundingtabs.page';

const routes: Routes = [
  {
    path: '',
    component: CrowdfundingtabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../tab-crowd-funding/tab-crowd-funding.module').then(m => m.TabCrowdFundingPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../crowdfunding-history/crowdfunding-history.module').then( m => m.CrowdfundingHistoryPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../crowdfunding-profile/crowdfunding-profile.module').then(m => m.CrowdfundingProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/crowdfundingtabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/crowdfundingtabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrowdfundingtabsPageRoutingModule {}
