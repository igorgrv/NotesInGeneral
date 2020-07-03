import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from './photo';

const API = 'http://localhost:3000/';

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) {
        this.http = http;
    }

    listFromUser(userName: string) {
        console.log(API + userName + '/photos');
        return this.http
            .get<Photo[]>(API + userName + '/photos');
    }

}