import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateEducationPostPageRoutingModule } from './create-education-post-routing.module';

import { CreateEducationPostPage } from './create-education-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateEducationPostPageRoutingModule
  ],
  declarations: [CreateEducationPostPage]
})
export class CreateEducationPostPageModule {}
