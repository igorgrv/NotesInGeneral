import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Photo } from './photo';

const API = 'http://localhost:3000/';

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) {
        this.http = http;
    }

    //localhost:3000/flavio/photos
    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(API + userName + '/photos');
    }

    //localhost:3000/flavio/photos?page=1
    listFromUserPaginated(userName: string, page:number) {
        //irá fazer um page = x
        const pageParam = new HttpParams().append('page', page.toString());

        // com a , iremos fazer um @QueryParam, parecido com o Java
        return this.http
            .get<Photo[]>(API + userName + '/photos' , { params: pageParam});
    }

}