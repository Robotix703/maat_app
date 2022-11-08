import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { List } from './list.model';

const URL_BACKEND = environment.apiURL + 'list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getLists(): Observable<List[]>{
    return this.http.get<List[]>(URL_BACKEND + '/', {});
  }
}
