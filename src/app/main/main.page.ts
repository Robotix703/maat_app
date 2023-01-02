/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { DisplayableList, FetchList } from '../list/list.model';
import { ListService } from '../list/list.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {

  loadedLists: DisplayableList[] = [];
  listsSub: Subscription;
  isLoading: boolean;
  userNumber: number;

  constructor(private listService: ListService, private authService: AuthService) { }

  display(data: FetchList) {
    this.loadedLists = [];
    for(const list of data.lists){
      const temp: DisplayableList = {
        _id: list._id,
        name: list.name,
        main: list.main,
        total: (this.userNumber === 0) ? list.total0 : list.total1,
        balance: (this.userNumber === 0) ? list.balance0 : list.balance1,
        merged: list.merged
      };
      this.loadedLists.push(temp);
    }
  }

  ngOnInit() {
    this.userNumber = this.authService.userNumber;

    this.listsSub = this.listService.getLists().subscribe(lists => {
      this.display(lists);
    });
  }

  ngOnDestroy(): void {
    this.listsSub.unsubscribe();
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.listsSub = this.listService.getLists().subscribe(lists => {
      this.display(lists);
    });
  }

  deleteList(listId: string, slidingEl: IonItemSliding) {
    this.listService.deleteList(listId).subscribe(response => {
      this.listsSub = this.listService.getLists().subscribe(lists => {
        this.display(lists);
      });
      slidingEl.close();
    });
  }
}
