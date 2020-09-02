import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoModule } from './photo/photo.module';
import { PhotoListModule } from './photo-list/photo-list.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PhotoModule, PhotoListModule],
})
export class PhotosModule {}
