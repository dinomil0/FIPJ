import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEducationPostPage } from './create-education-post.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEducationPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEducationPostPageRoutingModule {}
