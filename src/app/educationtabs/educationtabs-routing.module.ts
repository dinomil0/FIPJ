import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationtabsPage } from './educationtabs.page';

const routes: Routes = [
  {
    path: '',
    component: EducationtabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../educationplatform-home/educationplatform-home.module').then(m => m.EducationplatformHomePageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('../create-education-post/create-education-post.module').then( m => m.CreateEducationPostPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../users-profile/users-profile.module').then(m => m.UsersProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/educationtabs/home',
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
export class EducationtabsPageRoutingModule {}
