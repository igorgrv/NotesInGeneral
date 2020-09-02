import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlSegment, ActivatedRoute } from '@angular/router';
import { iPhoto } from './iPhoto';

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

  listUserPage(username:string, page:number){
    const pageNumber = new HttpParams().append('page', page.toString());
    return this.client.get<iPhoto[]>(API + username + '/photos' , {params: pageNumber});
  }
}
