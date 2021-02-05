import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEducationPostPage } from './view-education-post.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEducationPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEducationPostPageRoutingModule {}
