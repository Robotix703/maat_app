import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DeleteResponse } from '../list/list.model';
import { CreateResponse, FetchedPurchases, FormPurchase } from './purchase.model';

const URL_BACKEND = environment.apiURL + 'purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  getPurchases(listId: string): Observable<FetchedPurchases>{
    return this.http.get<FetchedPurchases>(URL_BACKEND + '?listId=' + listId, {});
  }

  deletePurchase(purchaseId: string): Observable<DeleteResponse>{
    return this.http.delete<DeleteResponse>(URL_BACKEND + '/' + purchaseId);
  }

  createPurchase(data: FormPurchase): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(URL_BACKEND + '/add', data);
  }
}
