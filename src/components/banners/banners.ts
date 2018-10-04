import { Component } from '@angular/core';
import { BannersProvider } from '../../providers/banners/banners';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'banners',
  templateUrl: 'banners.html'
})
export class BannersComponent {

  private responseData: any;
  private items;

  constructor(
    public bannersProvider: BannersProvider, 
    public loadingProvider: LoadingProvider
  ) {
    this.getList();
  }

  ionViewDidLoad(){
    this.getList();
  }

  public getList() {
    this.loadingProvider.present();
    this.bannersProvider.getList().subscribe(
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

}
