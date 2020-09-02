import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

const API = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private client: HttpClient, private userService:UserService) {
    this.client = client;
    this.userService = userService;
  }

  authenticate(userName: string, password: string) {
    return this.client
      .post(API + 'user/login', { userName, password }, { observe: 'response' })
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token');
          this.userService.setToken(authToken);
        })
      );
  }
}
