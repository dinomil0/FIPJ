import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplacePage } from '../marketplace/marketplace.page';

import { SocialmediaplatformPage } from './socialmediaplatform.page';

const routes: Routes = [
  {
    path: '',
    component: SocialmediaplatformPage,
    children:[
      {
        path: 'tab-market-place',
        children:[{
          path:'',
          component: MarketplacePage,
          loadChildren: () => import('../marketplace/marketplace-routing.module').then(m => m.MarketplacePageRoutingModule)
        }]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialmediaplatformPageRoutingModule {}
