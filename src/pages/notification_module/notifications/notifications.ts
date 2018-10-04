import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationsProvider } from '../../../providers/notifications/notifications';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { NotificationPage } from '../notification/notification';
import { LoadingProvider } from '../../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private heading = 'notifications';
  private responseData: any;
  private id;
  private items;
  private notification_id = 0;
  private filterData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notificationsProvider: NotificationsProvider,
    public loadingProvider: LoadingProvider
  ) {
    this.getList();
  }

  ionViewDidLoad() {

  }

  public getList() {
    this.loadingProvider.present();
    this.filterData = {
      notification_id: this.notification_id
    };
    this.notificationsProvider.list(this.filterData).subscribe(
      response => {
        this.responseData = response;
        this.items = this.responseData.data;
        this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        this.loadingProvider.dismiss();
      }
    );
   
  }


  public itemTapped(data: any) {
    this.navCtrl.push(NotificationPage, { id: data.user_notification_id });
  }

}
