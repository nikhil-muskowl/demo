import { Component } from '@angular/core';
import { UsersProvider } from '../../providers/users/users';
import { LoadingProvider } from '../../providers/loading/loading';
@Component({
  selector: 'account-detail',
  templateUrl: 'account-detail.html'
})
export class AccountDetailComponent {
  private id;
  private name;
  private email;
  private contact;
  private image;
  private responseData;
  constructor(
    public usersProvider: UsersProvider,
    public loadingProvider: LoadingProvider
  ) {
    this.id = this.usersProvider.id;
    this.fillData();
  }

  ionViewDidLoad() {
    this.fillData();
  }

  ionViewWillEnter() {
    this.fillData();
  }

  public fillData() {
    if (this.usersProvider.id) {
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
  }
}
