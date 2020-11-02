import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

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
  commentGroup: FormGroup;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);
    this.commentGroup = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)],
    });
  }

  saveComment() {
    const comment = this.commentGroup.get('comment').value as string;
    this.comments$ = this.photoService
      .saveComment(this.photoId, comment)
      .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
      .pipe(
        tap(() => {
          this.commentGroup.reset();
        })
      );
  }
}
