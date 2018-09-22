import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { UpdateProfilePage } from '../update-profile/update-profile';
import { UpdatePasswordPage } from '../update-password/update-password';
import { HomePage } from '../../public_module/home/home';
import { NotificationsPage } from '../../notification_module/notifications/notifications';
import { WishlistPage } from '../wishlist/wishlist';

import { UsersProvider } from '../../../providers/users/users';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { LoadingProvider } from '../../../providers/loading/loading';
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  private heading = 'My Account';
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private name;
  private email;
  private contact;
  private image;

  private responseData;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersProvider: UsersProvider,
    public loadingProvider: LoadingProvider
  ) {

  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    if (!this.usersProvider.id) {
      this.goToLogin();
    } else {
      this.fillData();
    }
  }

  public fillData() {
    this.loadingProvider.present();
    this.usersProvider.getDetails(this.usersProvider.id).subscribe(response => {
      this.responseData = response;
      this.name = this.responseData.result.name;
      this.email = this.responseData.result.email;
      this.contact = this.responseData.result.contact;
      this.image = this.responseData.result.image_thumb;
      this.loadingProvider.dismiss();
    }, err => {
      console.error(err);
    }
    );
    this.loadingProvider.dismiss();
  }

  public logout() {
    this.usersProvider.unSetData();
    this.navCtrl.setRoot(HomePage);
  }

  public goToRegister() {
    this.navCtrl.setRoot(RegisterPage);
  }

  public goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  public goToWishlist() {
    this.navCtrl.setRoot(WishlistPage);
  }

  public goToNotifications() {
    this.navCtrl.setRoot(NotificationsPage);
  }

  public goToUpdateProfile() {
    this.navCtrl.setRoot(UpdateProfilePage);
  }
  
  public goToUpdatePassword() {
    this.navCtrl.setRoot(UpdatePasswordPage);
  }

}
