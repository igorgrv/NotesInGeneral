import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './User';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;

  constructor(private tokenService: TokenService) {
    //caso o usuario saia e entre ira verificar se ja tem token cadastrado
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  decodeAndNotify() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;
    this.userName = user.name;
    this.userSubject.next(user); //passa a quem chamar o setToken um usuario descriptografado
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  getUserName() {
    return this.userName;
  }
}
