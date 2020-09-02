import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoModule } from '../photo/photo.module';
import { SearchComponent } from './search/search.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { FilterByDescriptionPipe } from './filter-by-description.pipe';

@NgModule({
  declarations: [PhotoListComponent, PhotosComponent, SearchComponent, LoadButtonComponent, FilterByDescriptionPipe],
  imports: [CommonModule, PhotoModule],
})
export class PhotoListModule {}
