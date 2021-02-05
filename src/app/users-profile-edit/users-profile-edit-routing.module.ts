import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersProfileEditPage } from './users-profile-edit.page';

const routes: Routes = [
  {
    path: '',
    component: UsersProfileEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersProfileEditPageRoutingModule {}
