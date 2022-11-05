/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';

export interface AuthResponseData {
  token: string;
  userId: string;
  expiresIn: string;
  userNumber: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    //
  }

  login(email: string, password: string) {
    //
  }

  logout() {
    //
  }

  ngOnDestroy() {
    //
  }
}
