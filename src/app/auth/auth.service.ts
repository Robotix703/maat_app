/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';

import { User } from './user.model';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  token: string;
  userId: string;
  expiresIn: string;
  userNumber: number;
  name: string;
}

const URL_BACKEND = environment.apiURL + 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;
  private validToken: string;

  get userIsAuthenticated(): Observable<boolean> {
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

  getValidToken(){
    return this.validToken;
  }

  constructor(private http: HttpClient) {}

  signup(name: string, password: string, invitationCode: string, userNumber: number): Observable<AuthResponseData> {
    return this.http.post<any>(URL_BACKEND + '/signup', {
      name: name,
      password: password,
      invitationCode: invitationCode,
      userNumber: userNumber
    })
    .pipe(tap(this.setUserData.bind(this)));
  }

  login(name: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(URL_BACKEND + '/login', {
      name: name,
      password: password
    })
    .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    Preferences.remove({ key: 'authData' });
  }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }

  autoLogin() {
    return from(Preferences.get({ key: 'authData' })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          name: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.name,
          parsedData.token,
          expirationTime
        );
        this.validToken = parsedData.token;
        return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const user = new User(
      userData.userId,
      userData.name,
      userData.token,
      expirationTime
    );
    this._user.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(
      userData.userId,
      userData.token,
      expirationTime.toISOString(),
      userData.name
    );
    this.validToken = userData.token;
  }

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    name: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      name: name
    });
    Preferences.set({ key: 'authData', value: data });
  }
}
