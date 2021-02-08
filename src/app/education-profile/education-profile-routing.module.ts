import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationProfilePage } from './education-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EducationProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationProfilePageRoutingModule {}
