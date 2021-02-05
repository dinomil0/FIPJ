import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductFlagPage } from './product-flag.page';

const routes: Routes = [
  {
    path: '',
    component: ProductFlagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductFlagPageRoutingModule {}
