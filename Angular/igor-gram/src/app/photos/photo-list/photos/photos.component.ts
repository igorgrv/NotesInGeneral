import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { iPhoto } from '../../photo/iPhoto';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnChanges {
  @Input() photos: iPhoto[] = [];
  row: any[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.photos) {
      this.row = this.groupColumns(this.photos);
    }
  }

  groupColumns(photos: iPhoto[]) {
    const newRows = [];

    for (let index = 0; index < photos.length; index += 3) {
      newRows.push(photos.slice(index, index + 3));
    }
    return newRows;
  }
}
