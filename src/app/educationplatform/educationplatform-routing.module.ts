import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationplatformPage } from './educationplatform.page';

const routes: Routes = [
  {
    path: '',
    component: EducationplatformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationplatformPageRoutingModule {}
