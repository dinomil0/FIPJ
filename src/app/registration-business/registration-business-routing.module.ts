import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationBusinessPage } from './registration-business.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationBusinessPageRoutingModule {}
