import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationplatformHomePage } from './educationplatform-home.page';

const routes: Routes = [
  {
    path: '',
    component: EducationplatformHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationplatformHomePageRoutingModule {}
