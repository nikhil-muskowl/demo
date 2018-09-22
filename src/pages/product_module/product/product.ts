import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { ScrollHideConfig } from '../../../directives/scroll-hide/scroll-hide';
import { LoadingProvider } from '../../../providers/loading/loading';
import { ProductInquiriesPage } from '../product-inquiries/product-inquiries';
import { AlertController } from 'ionic-angular';
import { WishlistPage } from '../../user_module/wishlist/wishlist';

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

  private status;
  private messageTitle;
  private message;
  private infoSegment = 'description';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productsProvider: ProductsProvider,
    public loadingProvider: LoadingProvider,
    private alertCtrl: AlertController,
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
   * setWishlist
   */
  public setWishlist() {
    this.loadingProvider.present();
    this.productsProvider.setWishlist(this.id).subscribe(
      response => {
        this.responseData = response;
        this.status = this.responseData.status;
        this.message = this.responseData.message;


        if (this.status) {
          this.messageTitle = 'Sucess!';
        } else {
          this.messageTitle = 'Warning!';

          if (this.responseData.result) {
            this.responseData.result.forEach(element => {

              if (element.id == 'user_id') {
                this.message = element.text
              }
              if (element.id == 'product_id') {
                this.message = element.text
              }

            });
          }
        }

        this.loadingProvider.dismiss();

        let alert = this.alertCtrl.create({
          title: this.messageTitle,
          message: this.message,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {

              }
            },
            {
              text: 'Go to Wishlist',
              handler: () => {
                this.navCtrl.setRoot(WishlistPage);
              }
            }
          ]
        });
        alert.present();
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
