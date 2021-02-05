import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationNotificationPage } from './education-notification.page';

const routes: Routes = [
  {
    path: '',
    component: EducationNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationNotificationPageRoutingModule {}
