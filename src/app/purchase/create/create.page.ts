/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { PrettyUser } from 'src/app/auth/user.model';
import { UserService } from 'src/app/auth/user.service';
import { FormPurchase, UserId } from '../purchase.model';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  @ViewChild('f', { static: false }) form: NgForm;

  listId = '';
  isLoading = false;
  users: PrettyUser[];
  userId: string;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('listId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.listId = paramMap.get('listId');
      this.users = this.userService.getPrettyUsers();
      this.authService.userId.subscribe(userId => {
        this.userId = userId;
      });
      this.isLoading = true;
    });
  }

  createPurchase(){
    if (!this.form.valid) {
      return;
    }

    const purchaseData: FormPurchase = {
      title: this.form.value.title,
      amount: this.form.value.amount,
      buyTo: this.form.value.buyTo as UserId[],
      from: this.userId as UserId,
      listId: this.listId
    };

    this.purchaseService.createPurchase(purchaseData).subscribe(response => {
      if(response.status === 'OK'){
        this.router.navigateByUrl('/list/view/' + this.listId);
      }
    });
  }
}
