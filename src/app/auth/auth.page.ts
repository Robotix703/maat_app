/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { PrettyUser } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() { }

  authenticate(userName: string, apiKey: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Test...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.login(userName, apiKey)
          .subscribe((userData: PrettyUser) => {
            this.authService.saveAPIKey(userName, userData.userId, userData.userNumber, apiKey)
              .then((result: any) => {
                this.isLoading = false;
                loadingEl.dismiss();
                this.router.navigateByUrl('/main');
              })
              .catch((error: any) => {
                console.error(error);
                this.alertCtrl
                  .create({
                    header: 'Authentication failed',
                    message: error,
                    buttons: ['Okay']
                  })
                  .then(alertEl => alertEl.present());
              });
          },
            (error: any) => {
              console.error(error);
              this.alertCtrl
                  .create({
                    header: 'Authentication failed',
                    message: error,
                    buttons: ['Okay']
                  })
                  .then(alertEl => alertEl.present());
            });
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const userName: string = form.value.name;
    const apiKey: string = form.value.apiKey;

    this.authenticate(userName, apiKey);
    form.reset();
  }
}
