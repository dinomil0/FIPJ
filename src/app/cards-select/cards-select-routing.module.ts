import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsSelectPage } from './cards-select.page';

const routes: Routes = [
  {
    path: '',
    component: CardsSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardsSelectPageRoutingModule {}
