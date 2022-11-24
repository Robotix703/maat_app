import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonItemSliding, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { PrettyPurchase } from '../../purchase/purchase.model';
import { PurchaseService } from '../../purchase/purchase.service';
import { PrettyList } from '../list.model';
import { ListService } from '../list.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit, OnDestroy {

  isLoading = false;
  listName = '';
  loadedPurchases: PrettyPurchase[];
  purchaseSub: Subscription;
  listId = '';
  prettyList: PrettyList;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private listService: ListService
    ) { }

  display(data: PrettyPurchase[]){
    this.loadedPurchases = data;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('listId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }

      this.listId = paramMap.get('listId');
      this.isLoading = true;

      this.purchaseSub = this.purchaseService.getPurchases(this.listId).subscribe(data => {
        this.display(data);
      });

      this.listService.getListById(this.listId).subscribe(list => {
        this.listName = list.name;
        this.prettyList = list;
      });
    });
  }

  ngOnDestroy(): void {
    this.purchaseSub.unsubscribe();
  }

  deletePurchase(purchaseId: string, slidingEl: IonItemSliding){
    this.purchaseService.deletePurchase(purchaseId).subscribe(response => {
      this.purchaseSub = this.purchaseService.getPurchases(purchaseId).subscribe(data => {
        this.display(data);
      });
      slidingEl.close();
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.purchaseSub = this.purchaseService.getPurchases(this.listId).subscribe(data => {
      this.display(data);
    });
  }
}
