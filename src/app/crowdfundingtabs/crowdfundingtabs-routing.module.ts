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
        path: 'crowdfunding',
        loadChildren: () => import('../tab-crowd-funding/tab-crowd-funding.module').then(m => m.TabCrowdFundingPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../users-profile/users-profile.module').then(m => m.UsersProfilePageModule)
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
