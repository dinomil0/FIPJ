import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotalUsersPage } from './total-users.page';

const routes: Routes = [
  {
    path: '',
    component: TotalUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotalUsersPageRoutingModule {}
