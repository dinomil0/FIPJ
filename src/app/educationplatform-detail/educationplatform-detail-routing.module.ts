import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationplatformDetailPage } from './educationplatform-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EducationplatformDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationplatformDetailPageRoutingModule {}
