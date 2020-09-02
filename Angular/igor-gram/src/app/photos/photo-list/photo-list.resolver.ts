import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { iPhoto } from '../photo/iPhoto';
import { PhotoService } from '../photo/photo.service';

@Injectable({ providedIn: 'root' })
export class PhotoListResolver implements Resolve<Observable<iPhoto[]>> {
  constructor(private service: PhotoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<iPhoto[]> {
    const username = route.params.username;
    return this.service.listUserPage(username, 1);
  }
}
