import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo/photo.service';
import { ActivatedRoute } from '@angular/router';
import { iPhoto } from '../photo/iPhoto';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: iPhoto[] = [];
  filter: string = '';
  currentPage: number = 1;
  hasMore: boolean = true;

  constructor(private service: PhotoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.photos = this.route.snapshot.data.photos;
  }

  load() {
    const username = this.route.snapshot.params.username;
    this.service
      .listUserPage(username, ++this.currentPage)
      .subscribe((photos) => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (!photos.length) {
          this.hasMore = false;
        }
      });
  }
}
