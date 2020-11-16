import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { iPhoto } from './iPhoto';
import { iPhotoComment } from './iPhotoComments';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

const API = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private client: HttpClient) {
    this.client = client;
  }

  listFromUser(username: string) {
    return this.client.get<iPhoto[]>(API + username + '/photos');
  }

  listUserPage(username: string, page: number) {
    const pageNumber = new HttpParams().append('page', page.toString());
    return this.client.get<iPhoto[]>(API + username + '/photos', {
      params: pageNumber,
    });
  }

  upload(description: string, allowComments: boolean, file: File) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.client.post(API + 'photos/upload', formData);
  }

  findById(photoId: number) {
    return this.client.get<iPhoto>(API + 'photos/' + photoId);
  }

  getComments(photoId: number) {
    return this.client.get<iPhotoComment[]>(
      API + 'photos/' + photoId + '/comments'
    );
  }

  saveComment(photoId: number, commentText: string) {
    console.log(photoId, commentText);
    return this.client.post(API + 'photos/' + photoId + '/comments', {
      commentText,
    });
  }

  removePhoto(photoId: number) {
    return this.client.delete(API + 'photos/' + photoId);
  }

  like(photoId: number) {
    return this.client
      .post(API + 'photos/' + photoId + '/like', {}, { observe: 'response' })
      .pipe(map((res) => true))
      .pipe(
        catchError((err) => {
          return (err.status = '304' ? of(false) : throwError(err));
        })
      );
  }
}
