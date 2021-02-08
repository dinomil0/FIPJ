import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketplaceTabsPage } from './marketplace-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceTabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../marketplace/marketplace.module').then(m => m.MarketplacePageModule)
      },
      {
        path: 'wishlist',
        loadChildren: () => import('../marketplace-wishlist/marketplace-wishlist.module').then(m => m.MarketplaceWishlistPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../view-product-listing/view-product-listing.module').then(m => m.ViewProductListingPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../marketplace-transaction-history/marketplace-transaction-history.module').then( m => m.MarketplaceTransactionHistoryPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../users-profile/users-profile.module').then(m => m.UsersProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/marketplace-tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/marketplace-tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplaceTabsPageRoutingModule {}
