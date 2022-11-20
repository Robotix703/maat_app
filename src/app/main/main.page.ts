import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';

import { FetchList, List } from '../list/list.model';
import { ListService } from '../list/list.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {

  loadedLists: List[];
  listsSub: Subscription;
  isLoading: boolean;

  constructor(private listService: ListService, private userService: UserService) { }

  display(data: FetchList) {
    this.loadedLists = data.lists;
  }

  ngOnInit() {
    this.listsSub = this.listService.getLists().subscribe(lists => {
      this.display(lists);
    });

    this.userService.getPrettyUsers();
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
