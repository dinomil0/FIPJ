import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignOutModalPage } from './sign-out-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SignOutModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignOutModalPageRoutingModule {}
