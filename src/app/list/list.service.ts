import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { DeleteResponse, FetchList } from './list.model';

const URL_BACKEND = environment.apiURL + 'list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getLists(): Observable<FetchList>{
    return this.http.get<FetchList>(URL_BACKEND + '/', {});
  }

  deleteList(listId: string): Observable<DeleteResponse>{
    return this.http.delete<DeleteResponse>(URL_BACKEND + '/' + listId);
  }
}
