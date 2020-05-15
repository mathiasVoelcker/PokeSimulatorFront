import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../user/entities/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../user/entities/user';

@Injectable()
export class AuthService extends MainService {

  constructor(private http: HttpClient) {
    super('Auth/');
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}login`, user);
  }

  signUp(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}register`, user);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN, token);
  }

  isLogged() {
    return localStorage.getItem(this.TOKEN) != null;
  }

  clear(): void {
    localStorage.removeItem(this.TOKEN);
  }
}
