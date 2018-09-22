import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationsProvider } from '../../../providers/notifications/notifications';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { LoadingProvider } from '../../../providers/loading/loading';


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private heading = 'Notification';
  private responseData: any;
  private id;
  private title;
  private description;
  private image;


  private infoSegment = 'description';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notificationsProvider: NotificationsProvider,
    public loadingProvider: LoadingProvider
  ) {
    this.id = this.navParams.get('id');
    this.getDetail();
  }


  public getDetail() {
    this.loadingProvider.present();
    this.notificationsProvider.detail(this.id).subscribe(
      response => {
        this.responseData = response;
        this.title = this.responseData.result[0].title;
        this.heading = this.responseData.result[0].title;
        this.description = this.responseData.result[0].description;
        this.image = this.responseData.result[0].image;
        this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }


}
