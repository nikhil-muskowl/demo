import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { ProductsPage } from '../../pages/product_module/products/products';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'categories-slider',
  templateUrl: 'categories-slider.html'
})
export class CategoriesSliderComponent {

  private responseData: any;
  private categories;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productsProvider: ProductsProvider,
    public loadingProvider: LoadingProvider
  ) {
    this.getCategories();
  }

  ionViewDidLoad(){
    this.getCategories();
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

  public goToProducts(data) {
    this.navCtrl.setRoot(ProductsPage, { category_id: data.id });
  }
}
