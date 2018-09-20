import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { ProductPage } from '../product/product';
import { LoadingProvider } from '../../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private heading = 'products';
  private responseData: any;
  private id;
  private items;
  private categories;
  private category_id = 0;
  private filterData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productsProvider: ProductsProvider,
    public loadingProvider: LoadingProvider
  ) {
    this.category_id = this.navParams.get('category_id');
    this.getCategories();
    this.getList();
  }

  ionViewDidLoad() {

  }

  public categoryChanged(event) {
    this.category_id = event.id;
    this.getList();
  }

  public getList() {
    this.loadingProvider.present();
    this.filterData = {
      category_id: this.category_id
    };
    this.productsProvider.getList(this.filterData).subscribe(
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
    return event;
  }

  public getCategories() {
    this.loadingProvider.present();
    this.productsProvider.getCategories().subscribe(
      response => {
        this.responseData = response;
        this.categories = this.responseData.data;
        this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  public itemTapped(data: any) {
    this.navCtrl.push(ProductPage, { id: data.id });
  }

}
