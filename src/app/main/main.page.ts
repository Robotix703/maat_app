import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { List } from '../list/list.model';
import { ListService } from '../list/list.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {

  loadedLists: List[];
  listsSub: Subscription;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listsSub = this.listService.getLists().subscribe(lists => {
      this.loadedLists = lists.lists;
    });
  }

  ngOnDestroy(): void {
    this.listsSub.unsubscribe();
  }

  deleteList(listId: string, slidingEl: IonItemSliding) {
    this.listService.deleteList(listId).subscribe(response => {
      console.log(response);
      slidingEl.close();
    });
  }
}
