/* eslint-disable id-blacklist */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';

import { PrettyUser } from './user.model';
import { environment } from '../../environments/environment';

const URL_BACKEND = environment.apiURL + 'user';

export interface AuthResponseData {
  token: string;
  userId: string;
  expiresIn: string;
  number: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiKey!: string;
  private _userNumber!: number;
  private _userName!: string;
  private _userIsAuthenticated = false;

  constructor(private http: HttpClient) {}

  get apiKey(){
    return this._apiKey;
  }

  get userName(){
    return this._userName;
  }

  get userNumber(){
    return this._userNumber;
  }

  get userIsAuthenticated(){
    return this._userIsAuthenticated;
  }

  public saveAPIKey(username: string, userNumber: number, apiKey: string): Promise<void>{
    const data = JSON.stringify({
      username: username,
      userNumber: userNumber,
      apiKey: apiKey
    });
    this._userName = username;
    this._userNumber = userNumber;
    this._apiKey = apiKey;
    this._userIsAuthenticated = true;
    return Preferences.set({ key: 'authData', value: data });
  }

  public login(username: string, apiKey: string): Observable<PrettyUser>{
    return this.http.post<PrettyUser>(URL_BACKEND + '/login', {userName: username, apiKey: apiKey});
  }

  getAPIKey(): Observable<boolean>{
    return from(Preferences.get({ key: 'authData' })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return false;
        }
        const parsedData = JSON.parse(storedData.value) as {
          username: string;
          userNumber: number;
          apiKey: string;
        };
        this._apiKey = parsedData.apiKey;
        this._userNumber = parsedData.userNumber;
        this._userName = parsedData.username;
        return true;
      })
    );
  }
}
