import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationTagsPage } from './education-tags.page';

const routes: Routes = [
  {
    path: '',
    component: EducationTagsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationTagsPageRoutingModule {}
