import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEducationPostPageRoutingModule } from './edit-education-post-routing.module';

import { EditEducationPostPage } from './edit-education-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditEducationPostPageRoutingModule
  ],
  declarations: [EditEducationPostPage]
})
export class EditEducationPostPageModule {}
