import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CreateResponse, DeleteResponse, FetchList, FormCreateList } from './list.model';

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

  createList(data: FormCreateList): Observable<CreateResponse>{
    return this.http.post<CreateResponse>(URL_BACKEND + '/', {
      name: data.listName,
      main: data.isMain,
      total0: 0,
      total1: 0,
      balance0: 0,
      balance1: 0,
      merged: false
    });
  }
}
