import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { SocialSharingProvider } from '../../../providers/social-sharing/social-sharing';
import { SearchProductsPage } from '../../product_module/search-products/search-products';
import { NotificationsPage } from '../../notification_module/notifications/notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private heading = 'My Shop';
  footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private message = 'Welcome to the official PPL app. Pacific Premier League is an under-19 cricket championship organized by Pacific University, Udaipur. In this league, eight different teams are going to take part to earn the title of Pacific Premier League Champions. PPL Cricket tournament is going to start on 20th August 2018 and the final match will be played on 20th September 2018. It is to keep you updated about the teams, players and the matches taking place in PPL 2018.';
  private subject = 'PPL - Pacific Premier League';
  private image = 'https://lh3.googleusercontent.com/TX5dGtgyZOgySVrzfauged8rVmI7j2fbqthp8dMCidZi4OPQJlnMAFt_UZ3QrRx41qI=s180-rw';
  private url = 'https://play.google.com/store/apps/details?id=com.ppl';

  constructor(private socialSharing: SocialSharingProvider, public navCtrl: NavController) {

  }


  public goToSearch(){
    this.navCtrl.setRoot(SearchProductsPage);
  }


  regularShare() {
    this.socialSharing.message = this.message;
    this.socialSharing.subject = this.subject;
    this.socialSharing.image = this.image;
    this.socialSharing.url = this.url;
    this.socialSharing.share();
  }

  instagramShare() {
    this.socialSharing.appName = 'instagram';
    this.socialSharing.message = null;
    this.socialSharing.subject = null;
    this.socialSharing.image = null;
    this.socialSharing.url = this.url;
    this.socialSharing.shareVia();
  }

  whatsappShare() {
    this.socialSharing.appName = 'whatsapp';
    this.socialSharing.message = this.message;
    this.socialSharing.subject = this.subject;
    this.socialSharing.image = this.image;
    this.socialSharing.url = this.url;
    this.socialSharing.shareVia();
  }

  twitterShare() {
    this.socialSharing.appName = 'twitter';
    this.socialSharing.message = this.message;
    this.socialSharing.subject = this.subject;
    this.socialSharing.image = this.image;
    this.socialSharing.url = this.url;
    this.socialSharing.shareVia();
  }

  facebookShare() {
    this.socialSharing.appName = 'facebook';
    this.socialSharing.message = null;
    this.socialSharing.subject = null;
    this.socialSharing.image = null;
    this.socialSharing.url = this.url;
    this.socialSharing.shareVia();
  }


  openNotifications(){
    this.navCtrl.setRoot(NotificationsPage);
  }

}
