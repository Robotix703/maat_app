import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PrettyUser } from 'src/app/auth/user.model';
import { UserService } from 'src/app/auth/user.service';
import { PrettyPurchase } from '../purchase.model';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  purchaseId: string;
  isLoading: boolean;
  purchaseSub: Subscription;
  purchase: PrettyPurchase;
  users: PrettyUser[];
  form: FormGroup;

  constructor(
    private purchaseService: PurchaseService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private userService: UserService)
  { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('purchaseId')) {
        this.navCtrl.navigateBack('/main');
        return;
      }

      this.purchaseId = paramMap.get('purchaseId');
      this.isLoading = true;

      this.purchaseSub = this.purchaseService.getPurchase(this.purchaseId).subscribe(data => {
        this.display(data);
        this.isLoading = false;
      });
    });
  }

  display(data: PrettyPurchase){
    this.purchase = data;
    this.users = [this.purchase.user0, this.purchase.user1];

    console.log(this.purchase);

    this.form = new FormGroup({
      title: new FormControl(this.purchase.title, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      amount: new FormControl(this.purchase.amount, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      from: new FormControl(this.purchase.from, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      buyTo: new FormControl(this.purchase.buyTo, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  updatePurchase(){

  }

  compareFn(e1: PrettyUser, e2: PrettyUser){
    return e1 && e2 ? e1 === e2 : e1 === e2;
  }
  compareBuyToFn(e1: PrettyUser, e2: PrettyUser){
    return e1 && e2 ? e1 === e2 : e1 === e2;
  }
}
