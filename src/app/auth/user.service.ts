import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrettyUser } from './user.model';

const URL_BACKEND = environment.apiURL + 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersSub: Subscription;
  users: PrettyUser[];

  constructor(private http: HttpClient) { }

  init(): void {
    this.usersSub = this.getUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }

  getPrettyUsers(): PrettyUser[]{
    if(this.usersSub){
      return this.users;
    }
    else{
      this.init();
      this.getPrettyUsers();
    }
  }

  private getUsers(): Observable<PrettyUser[]>{
    return this.http.get<PrettyUser[]>(URL_BACKEND + '/all', {});
  }
}
