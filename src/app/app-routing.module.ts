import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },

  {
    path: 'edit-accounts/:id',
    loadChildren: () => import('./edit-accounts/edit-accounts.module').then( m => m.EditAccountsPageModule)
  },
  {
    path: 'tab-market-history',
    loadChildren: () => import('./tab-market-history/tab-market-history.module').then( m => m.TabMarketHistoryPageModule)
  },
  {
    path: 'users-profile',
    loadChildren: () => import('./users-profile/users-profile.module').then( m => m.UsersProfilePageModule)
  },
  {
    path: 'view-product-listing',
    loadChildren: () => import('./view-product-listing/view-product-listing.module').then( m => m.ViewProductListingPageModule)
  },
  {
    path: 'create-product-listing',
    loadChildren: () => import('./create-product-listing/create-product-listing.module').then( m => m.CreateProductListingPageModule)
  },
  {
    path: 'edit-product-listing/:id',
    loadChildren: () => import('./edit-product-listing/edit-product-listing.module').then( m => m.EditProductListingPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('./cards/cards.module').then( m => m.CardsPageModule)
  },
  {
    path: 'beans-rewards',
    loadChildren: () => import('./beans-rewards/beans-rewards.module').then( m => m.BeansRewardsPageModule)
  },
  {
    path: 'marketplace-tabs',
    loadChildren: () => import('./marketplace-tabs/marketplace-tabs.module').then( m => m.MarketplaceTabsPageModule)
  },
  {
    path: 'users-profile-edit/:uid',
    loadChildren: () => import('./users-profile-edit/users-profile-edit.module').then( m => m.UsersProfileEditPageModule)
  },
  {
    path: 'product-details/:prodID',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'beans-history',
    loadChildren: () => import('./beans-history/beans-history.module').then( m => m.BeansHistoryPageModule)
  },
  {
    path: 'marketplace-wishlist',
    loadChildren: () => import('./marketplace-wishlist/marketplace-wishlist.module').then( m => m.MarketplaceWishlistPageModule)
  },
  {
    path: 'product-flag',
    loadChildren: () => import('./product-flag/product-flag.module').then( m => m.ProductFlagPageModule)
  },
  {
    path: 'sign-out-modal',
    loadChildren: () => import('./sign-out-modal/sign-out-modal.module').then( m => m.SignOutModalPageModule)
  },
  {
    path: 'total-users',
    loadChildren: () => import('./total-users/total-users.module').then( m => m.TotalUsersPageModule)
  },
  {
    path: 'total-business',
    loadChildren: () => import('./total-business/total-business.module').then( m => m.TotalBusinessPageModule)
  },
  {
    path: 'carbon-footprint',
    loadChildren: () => import('./carbon-footprint/carbon-footprint.module').then( m => m.CarbonFootprintPageModule)
  },
  {
    path: 'carbon-footprint-summary',
    loadChildren: () => import('./carbon-footprint-summary/carbon-footprint-summary.module').then( m => m.CarbonFootprintSummaryPageModule)
  },
  {
    path: 'product-pending',
    loadChildren: () => import('./product-pending/product-pending.module').then( m => m.ProductPendingPageModule)
  },
  {
    path: 'cards-select',
    loadChildren: () => import('./cards-select/cards-select.module').then( m => m.CardsSelectPageModule)
  },
  {
    path: 'educationplatform-home',
    loadChildren: () => import('./educationplatform-home/educationplatform-home.module').then( m => m.EducationplatformHomePageModule)
  },
  {
    path: 'create-education-post',
    loadChildren: () => import('./create-education-post/create-education-post.module').then( m => m.CreateEducationPostPageModule)
  },
  {
    path: 'marketplace',
    loadChildren: () => import('./marketplace/marketplace.module').then( m => m.MarketplacePageModule)
  },
  {
    path: 'socialmediaplatform',
    loadChildren: () => import('./socialmediaplatform/socialmediaplatform.module').then( m => m.SocialmediaplatformPageModule)
  },
  {
    path: 'educationplatform',
    loadChildren: () => import('./educationplatform/educationplatform.module').then( m => m.EducationplatformPageModule)
  },
  {
    path: 'educationplatform-detail/:id',
    loadChildren: () => import('./educationplatform-detail/educationplatform-detail.module').then( m => m.EducationplatformDetailPageModule)
  },
  {
    path: 'crowdfundingdonate/:id',
    loadChildren: () => import('./crowdfundingdonate/crowdfundingdonate.module').then( m => m.CrowdfundingdonatePageModule)
  },
  {
    path: 'view-education-post',
    loadChildren: () => import('./view-education-post/view-education-post.module').then( m => m.ViewEducationPostPageModule)
  },
  {
    path: 'edit-education-post/:id',
    loadChildren: () => import('./edit-education-post/edit-education-post.module').then( m => m.EditEducationPostPageModule)
  },
  {
    path: 'create-crowdfunding-listing',
    loadChildren: () => import('./create-crowdfunding-listing/create-crowdfunding-listing.module').then( m => m.CreateCrowdfundingListingPageModule)
  },
  {
    path: 'crowdfundingtabs',
    loadChildren: () => import('./crowdfundingtabs/crowdfundingtabs.module').then( m => m.CrowdfundingtabsPageModule)
  },
  {
    path: 'educationtabs',
    loadChildren: () => import('./educationtabs/educationtabs.module').then( m => m.EducationtabsPageModule)
  },
  {
    path: 'education-notification',
    loadChildren: () => import('./education-notification/education-notification.module').then( m => m.EducationNotificationPageModule)
  },
  {
    path: 'education-tags/:id',
    loadChildren: () => import('./education-tags/education-tags.module').then( m => m.EducationTagsPageModule)
  },
  {
    path: 'registration-modal',
    loadChildren: () => import('./registration-modal/registration-modal.module').then( m => m.RegistrationModalPageModule)
  },
  {
    path: 'registration-business',
    loadChildren: () => import('./registration-business/registration-business.module').then( m => m.RegistrationBusinessPageModule)
  },
  {
    path: 'crowdfunding-pending',
    loadChildren: () => import('./crowdfunding-pending/crowdfunding-pending.module').then( m => m.CrowdfundingPendingPageModule)
  },
  {
    path: 'crowdfunding-edit/:id',
    loadChildren: () => import('./crowdfunding-edit/crowdfunding-edit.module').then( m => m.CrowdfundingEditPageModule)
  },
  {
    path: 'marketplace-eco-rating-filter',
    loadChildren: () => import('./marketplace-eco-rating-filter/marketplace-eco-rating-filter.module').then( m => m.MarketplaceEcoRatingFilterPageModule)
  },
  {
    path: 'crowdfunding-profile',
    loadChildren: () => import('./crowdfunding-profile/crowdfunding-profile.module').then( m => m.CrowdfundingProfilePageModule)
  },
  {
    path: 'carbonfootprint-pending',
    loadChildren: () => import('./carbonfootprint-pending/carbonfootprint-pending.module').then( m => m.CarbonfootprintPendingPageModule)
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./leaderboard/leaderboard.module').then( m => m.LeaderboardPageModule)
  },
  {
    path: 'education-profile',
    loadChildren: () => import('./education-profile/education-profile.module').then( m => m.EducationProfilePageModule)
  },
  {
    path: 'carbonfootprint-detail/:id',
    loadChildren: () => import('./carbonfootprint-detail/carbonfootprint-detail.module').then( m => m.CarbonfootprintDetailPageModule)
  },
  {
    path: 'crowdfunding-history',
    loadChildren: () => import('./crowdfunding-history/crowdfunding-history.module').then( m => m.CrowdfundingHistoryPageModule)
  },
  {
    path: 'marketplace-transaction-history',
    loadChildren: () => import('./marketplace-transaction-history/marketplace-transaction-history.module').then( m => m.MarketplaceTransactionHistoryPageModule)
  },
  {
    path: 'update-average-carbonfootprint',
    loadChildren: () => import('./update-average-carbonfootprint/update-average-carbonfootprint.module').then( m => m.UpdateAverageCarbonfootprintPageModule)
  },
  {
    path: 'add-to-cart-popover',
    loadChildren: () => import('./add-to-cart-popover/add-to-cart-popover.module').then( m => m.AddToCartPopoverPageModule)
  },
  {
    path: 'view-cart',
    loadChildren: () => import('./view-cart/view-cart.module').then( m => m.ViewCartPageModule)
  },
  {
    path: 'mp-checkout',
    loadChildren: () => import('./mp-checkout/mp-checkout.module').then( m => m.MpCheckoutPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
