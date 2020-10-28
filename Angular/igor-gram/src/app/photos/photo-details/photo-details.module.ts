import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';
import { RouterModule } from '@angular/router';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';

@NgModule({
  declarations: [PhotoDetailsComponent, PhotoCommentsComponent],
  imports: [CommonModule, PhotoModule, RouterModule],
  exports: [PhotoDetailsComponent, PhotoCommentsComponent]
})
export class PhotoDetailsModule {}
