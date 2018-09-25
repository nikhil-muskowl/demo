import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { ProductsPage } from '../products/products';
import { LoadingProvider } from '../../../providers/loading/loading';
@IonicPage()
@Component({
  selector: 'page-product-categories',
  templateUrl: 'product-categories.html',
})
export class ProductCategoriesPage {
  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private heading = 'Categories';
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
    this.getCategories();
  }

  ionViewDidLoad() {

  }

  public getCategories() {
    this.loadingProvider.present();
    this.productsProvider.getAllCategories().subscribe(
      response => {
        this.responseData = response;
        this.categories = this.responseData.data;
        console.log(this.categories);
        this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  toggleSection(i) {    
    this.categories[i].open = !this.categories[i].open;
  }

  toggleItem(i, j) {   
    this.categories[i].childrens[j].open = !this.categories[i].childrens[j].open;
  }

  public itemTapped(data: any) {
    this.navCtrl.push(ProductsPage, { category_id: data.id });
  }

}
