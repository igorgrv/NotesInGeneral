import { Pipe, PipeTransform } from '@angular/core';
import { iPhoto } from '../photo/iPhoto';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'filterByDescription',
})
export class FilterByDescriptionPipe implements PipeTransform {
  transform(photos: iPhoto[], filterValue: string): unknown {
    filterValue = filterValue.trim().toLowerCase();
    if (filterValue) {
      return photos.filter((photo) =>
        photo.description.toLowerCase().includes(filterValue)
      );
    } else {
      return photos;
    }
  }
}
