import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewEducationPostPageRoutingModule } from './view-education-post-routing.module';

import { ViewEducationPostPage } from './view-education-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewEducationPostPageRoutingModule
  ],
  declarations: [ViewEducationPostPage]
})
export class ViewEducationPostPageModule {}
