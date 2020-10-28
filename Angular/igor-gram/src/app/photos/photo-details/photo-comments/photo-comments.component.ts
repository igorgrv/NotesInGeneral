import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { iPhotoComment } from '../../photo/iPhotoComments';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css'],
})
export class PhotoCommentsComponent implements OnInit {
  comments$: Observable<iPhotoComment[]>;
  @Input() photoId: number;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    console.log(this.photoId);
    this.comments$ = this.photoService.getComments(this.photoId);
  }
}
