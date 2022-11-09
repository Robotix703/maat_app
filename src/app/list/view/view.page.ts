import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonItemSliding, NavController } from '@ionic/angular';

import { FetchedPurchases, Purchase } from '../../purchase/purchase.model';
import { PurchaseService } from '../../purchase/purchase.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  isLoading = false;
  listName = '';
  loadedPurchases: Purchase[];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private purchaseService: PurchaseService
    ) { }

  display(data: FetchedPurchases){
    this.listName = data.listName;
    this.loadedPurchases = data.purchases;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('listId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }

      const listId: string = paramMap.get('listId');
      this.isLoading = true;

      this.purchaseService.getPurchases(listId).subscribe(data => {
        this.display(data);
      });
    });
  }

  deletePurchase(purchaseId: string, slidingEl: IonItemSliding){

  }
}
