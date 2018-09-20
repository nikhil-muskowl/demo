import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { LoadingProvider } from '../../../providers/loading/loading';
import { ProductInquiriesPage } from '../product-inquiries/product-inquiries';


@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 50 };

  private heading = 'Products';
  private responseData: any;
  private id;
  private title;
  private description;
  private html;
  private image;
  private price;
  private images;


  private infoSegment = 'description';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productsProvider: ProductsProvider,
    public loadingProvider: LoadingProvider
  ) {
    this.id = this.navParams.get('id');
    this.getDetail();
  }


  public getDetail() {
    this.loadingProvider.present();
    this.productsProvider.getDetail(this.id).subscribe(
      response => {
        this.responseData = response;
        this.title = this.responseData.result[0].title;
        this.heading = this.responseData.result[0].title;
        this.description = this.responseData.result[0].description;
        this.html = this.responseData.result[0].html;
        this.price = this.responseData.result[0].price;
        this.image = this.responseData.result[0].image;
        this.images = this.responseData.result[0].images;
        this.loadingProvider.dismiss();
      },
      err => {
        console.error(err);
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }


  /**
   * goToInquiry
   */
  public goToInquiry() {
    this.navCtrl.setRoot(ProductInquiriesPage, { product_id: this.id });
  }

}
