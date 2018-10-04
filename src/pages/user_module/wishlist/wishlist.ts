import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { ProductPage } from '../../product_module/product/product';
import { LoadingProvider } from '../../../providers/loading/loading';


@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private heading = 'Wishlist';
  private responseData: any;
  private id;
  private items;
  private filterData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productsProvider: ProductsProvider,
    public loadingProvider: LoadingProvider
  ) {

    this.getList();
  }

  ionViewDidLoad() {

  } 

  public getList() {
    this.loadingProvider.present();

    this.productsProvider.getWishlist().subscribe(
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
    this.navCtrl.push(ProductPage, { id: data.product_id });
  }

}
